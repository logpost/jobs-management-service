import AccountFactoryInterface from '../entities/interfaces/data/account.factory.interface'
import AccountFactory from '../factorys/account.factory'
import { JobInterface } from '../entities/interfaces/data/job.interface'
import JobsRepository from '../repositories/jobs.repository'
import { createJobDTO, updateJobInfoDTO, deleteJobDTO, pickJobDTO, UserPermissionDTO } from '../entities/dtos/job.dto'
import * as Validator from '../helper/validate.helper'
import { Payload } from '../entities/dtos/token.dto'
import FormatterJob from '../helper/formatter.handler'
import JobsFilterFactory from '../filters/jobs.filter.factory'

const fetcher = new AccountFactory()

async function findAllJobs(isLogposter: boolean): Promise<JobInterface[]> {
	try {
		const jobsRepository = JobsRepository.getInstance()
		let passport: UserPermissionDTO
		const jobs = await jobsRepository.findAllJobs()

		if (jobs.length > 0) {
			const jobsFiltered = await JobsFilterFactory.filterByQuery(jobs, {
				status: 100,
				permission: 'public',
			})
			if (isLogposter) {
				passport = {
					account: {
						role: 'carrier',
						account_type: 'personal',
					} as Payload,
					permission: 'logposter',
				}
			} else {
				passport = {
					account: {
						role: 'guest',
						account_type: 'guest',
					} as Payload,
					permission: 'guest',
				}
			}

			const formatter = new FormatterJob(passport, jobsFiltered)
			return await formatter.getter()
		}

		return jobs
	} catch (error) {
		throw new Error(`400 : Find all jobs is not successfully`)
	}
}

async function createJob(role: string, shipper_id: string, jobinfo: createJobDTO): Promise<string> {
	const jobsRepository = JobsRepository.getInstance()
	try {
		const job_id = await jobsRepository.createJob(jobinfo)
		if (job_id) {
			const res = await fetcher.account[role as keyof AccountFactoryInterface].addJobHistory(
				{ shipper_id },
				job_id,
			)
			if (res.data) return `201 : Create job is successfully`
			throw new Error(`400 : Create job is not successfully`)
		}
		throw new Error(`400 : Create job is not successfully`)
	} catch (err) {
		console.log(err)
		throw new Error(`400 : Create job is not successfully`)
	}
}

async function pickJob(account: Payload, infopicked: pickJobDTO): Promise<string> {
	const { sub: carrier_id, display_name: carrier_display_name, username } = account
	const { driver_id, truck_id, job_id } = infopicked
	const jobsRepository = JobsRepository.getInstance()
	const job = await jobsRepository.findJobsByJobId(job_id)
	if (job) {
		const { carrier_id: carrier_picked } = job
		if (!carrier_picked) {
			const { data: carrier } = await fetcher.account['carrier'].findAccountByUsername(username)
			if (carrier) {
				const { trucks, drivers } = carrier
				const existTruck = trucks.filter((truck: any) => truck.truck_id === truck_id)
				const existDriver = drivers.filter((driver: any) => driver.driver_id === driver_id)
				if (existTruck.length === 1 && existDriver.length === 1) {
					if (existTruck[0].status !== 100) throw new Error(`400 : Your truck is not avaliable.`)
					if (existDriver[0].status !== 100) throw new Error(`400 : Your driver is not avaliable.`)
					const { data: resUpdateJobHistory } = await fetcher.account['carrier'].addJobHistory(
						{ username },
						job_id,
					)
					if (!resUpdateJobHistory) {
						throw new Error(`400 : Update job history not successfully.`)
					}
					const { data: resUpdateDriverStatus } = await fetcher.account['carrier'].updateDriverStatus(
						{ username },
						{
							driver_id,
							driverinfo: { status: 200 },
						},
					)
					if (!resUpdateDriverStatus) {
						await fetcher.account['carrier'].deleteJobHistory({ username }, job_id)
						throw new Error(`400 : Update status driver who you pick not successfully.`)
					}

					const { data: resUpdateTruckStatus } = await fetcher.account['carrier'].updateTruckStatus(
						{ username },
						{ truck_id, truckinfo: { status: 200 } },
					)
					if (!resUpdateTruckStatus) {
						await fetcher.account['carrier'].deleteJobHistory({ username }, job_id)
						await fetcher.account['carrier'].updateDriverStatus(
							{ username },
							{
								driver_id,
								driverinfo: { status: 100 },
							},
						)
						throw new Error(`400 : Update status truck who you pick not successfully.`)
					}

					const n = await jobsRepository.updateJobsInfoByJobId(job_id, {
						carrier_id,
						truck_id,
						driver_id,
						carrier_display_name,
						status: 200,
					})

					if (n && n > 0) return `200 : Done, you are working with this job.`
					throw new Error(`500 : Your account is not activated.`)
				}
				throw new Error(`404 : Your truck or driver aren't exist.`)
			}
			throw new Error(`404 : Your account is not activated.`)
		} else {
			throw new Error(`400 : This job is picked from another`)
		}
	} else {
		throw new Error(`404 : This job is not exist.`)
	}
}

async function updateJobInfo(role: string, identifier: string | undefined, info: updateJobInfoDTO): Promise<string> {
	const jobsRepository = JobsRepository.getInstance()
	let errorFieldsUpdate: string[] = []
	const { job_id, jobinfo } = info
	const job = await jobsRepository.findJobsByJobId(job_id)

	if (job) {
		if (job.permission !== 'delete') {
			if (role === 'shipper') {
				errorFieldsUpdate = Validator.validUpdatedFields(jobinfo, 'shipper')
				if (identifier !== job.shipper_id) {
					throw new Error(`403 : Unauthorize, Only owner can edit information this job.`)
				}
			} else if (role === 'carrier') {
				errorFieldsUpdate = Validator.validUpdatedFields(jobinfo, 'carrier')
				if (identifier !== job.carrier_id) {
					throw new Error(`403 : Unauthorize, This job have carrier picked.`)
				}
			} else if (role === 'driver') {
				errorFieldsUpdate = Validator.validUpdatedFields(jobinfo, 'driver')
				const { carrier_id } = job
				const query = {
					tel: identifier,
				}
				const { data } = await fetcher.account['carrier'].findDriverByFiltering({ carrier_id }, query)
				if (data) {
					if (data.length <= 0) {
						throw new Error(`403 : Unauthorize, Only driver who drive with carrier picked the job.`)
					}
				} else {
					throw new Error(
						`404 : Unauthorize, Your tel number didn't match driver tel number who drive with carrier picked the job.`,
					)
				}
			} else {
				throw new Error(`403 : Unauthorize, you didn't login or your role can't access this endpoint.`)
			}

			if (errorFieldsUpdate.length > 0) throw new Error(`400 : Invalid Fields! ${errorFieldsUpdate.join(', ')}`)

			try {
				const n = await jobsRepository.updateJobsInfoByJobId(job_id, jobinfo)
				if (n && n > 0) return `204 : Updated, Job information is update successfully`
				throw new Error(`404 : Your job_id didn't exist.`)
			} catch (error) {
				console.error(error)
				throw new Error(`400 : Update job information is not successfully`)
			}
		}
		throw new Error(`403 : Update job information is not successfully, Your job is unavaliable`)
	}
	throw new Error(`404 : Your job is not exist.`)
}

async function deleteJob(shipper_id: string, job_id: string): Promise<string> {
	const jobsRepository = JobsRepository.getInstance()
	const job = await jobsRepository.findJobsByJobId(job_id)

	if (job) {
		if (job.permission !== 'delete') {
			if (!job.carrier_id) {
				if (shipper_id === job.shipper_id) {
					const nDelete = await fetcher.account['shipper'].deleteJobHistory({ shipper_id }, job_id)
					if (nDelete && nDelete > 0) {
						const n = await jobsRepository.updateJobsInfoByJobId(job_id, { permission: 'delete' })
						if (n && n > 0) return `204 : Delete job is successfully.`
						throw new Error(`400 : Delete job is not successfully.`)
					}
					throw new Error(`500 : Delete job is not successfully because shipper adapter`)
				}
				throw new Error(`403 : Unauthorize, Only owner can edit information this job.`)
			}
			throw new Error(`403 : Can't delete this job because your job picked by carrier.`)
		}
		throw new Error(`403 : Your job is unavaliable`)
	}
	throw new Error(`404 : Your job is not exist.`)
}

async function forceDeleteJob(shipper_id: string, job_id: string): Promise<string> {
	const jobsRepository = JobsRepository.getInstance()
	const job = await jobsRepository.findJobsByJobId(job_id)

	if (job) {
		if (job.permission !== 'delete') {
			if (!job.carrier_id) {
				if (shipper_id === job.shipper_id) {
					const nDelete = await fetcher.account['shipper'].deleteJobHistory({ shipper_id }, job_id)
					if (nDelete && nDelete > 0) {
						const n = await jobsRepository.forceDeleteJob(job_id)
						if (n && n > 0) return `204 : Delete job is successfully.`
						throw new Error(`400 : Delete job is not successfully.`)
					}
					throw new Error(`500 : Delete job is not successfully because shipper adapter`)
				}
				throw new Error(`403 : Unauthorize, Only owner can edit information this job.`)
			}
			throw new Error(`403 : Can't delete this job because your job picked by carrier.`)
		}
		throw new Error(`403 : Your job is unavaliable`)
	}
	throw new Error(`404 : Your job is not exist.`)
}

async function getDetailJob(user: UserPermissionDTO, job_id: string): Promise<JobInterface> {
	const jobsRepository = JobsRepository.getInstance()

	let { permission, account } = user
	const { role, account_type, sub: identifier } = account
	const job = await jobsRepository.findJobsByJobId(job_id)
	if (job) {
		if (job.permission !== 'delete') {
			if (
				role !== 'driver' &&
				job[`${role}_id` as keyof JobInterface] &&
				job[`${role}_id` as keyof JobInterface] === identifier
			) {
				// this permission will pass all condition below.
				permission = 'owner'
			}

			if (permission === 'logposter' || permission === 'guest') {
				if (role !== 'driver') {
					if (job.status !== 100) {
						throw new Error(`403 : This job is unavaliable`)
					}
				} else {
					// driver conditions
					if (job.status !== 100) {
						const { carrier_id } = job
						const query = {
							tel: identifier,
						}
						const { data } = await fetcher.account['carrier'].findDriverByFiltering({ carrier_id }, query)
						if (data) {
							if (data.length <= 0) {
								throw new Error(`403 : Unauthorize, Only driver who drive with carrier picked the job.`)
							}
						} else {
							throw new Error(
								`404 : Unauthorize, Your tel number didn't match driver tel number who drive with carrier picked the job.`,
							)
						}
					} else {
						throw new Error(`403 : Unauthorize, This job didn't have carrier pick.`)
					}
				}
			}

			const formatter = new FormatterJob(
				{
					account: {
						account_type: account_type, // safe to undefined when user is driver
						role,
					} as Payload,
					permission,
				},
				job,
			)

			return await formatter.getter()
		}
		throw new Error(`403 : Your job is unavaliable`)
	}
	throw new Error(`404 : Your job is not exist.`)
}

export default {
	createJob,
	findAllJobs,
	updateJobInfo,
	pickJob,
	deleteJob,
	forceDeleteJob,
	getDetailJob,
}
