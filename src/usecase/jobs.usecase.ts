import AccountFactoryInterface from '../entities/interfaces/data/account.factory.interface'
import AccountFactory from '../factorys/account.factory'
import { JobInterface } from '../entities/interfaces/data/job.interface'
import JobsRepository from '../repositories/jobs.repository'
import { hashing, compareHashed } from '../helper/hashing.handler'
import { createJobDTO, updateJobInfoDTO, deleteJobDTO } from '../entities/dtos/job.dto'

const fetcher = new AccountFactory()

// async function adminFindJobsByIdentifier(identifier: identifierDTO): Promise<JobsInterface> {
// 	try {
// 		const jobsRepository = JobsRepository.getInstance()
// 		const data = await jobsRepository.adminFindJobsByIdentifier(identifier)
// 		if (data) return data
// 	} catch (error) {
// 		throw new Error(`400 : Save data is not successfully`)
// 	}
// 	throw new Error(`404 : username is not exist in database`)
// }

// async function findProfileJobsAccountByUsername(identifier: identifierDTO): Promise<JobsInterface> {
// 	try {
// 		const jobsRepository = JobsRepository.getInstance()
// 		const data = await jobsRepository.findJobsByIdentifier(identifier)
// 		if (data) return data
// 	} catch (error) {
// 		throw new Error(`400 : Save data is not successfully`)
// 	}
// 	throw new Error(`404 : username is not exist in database`)
// }

async function findAllJobs(): Promise<JobInterface[]> {
	try {
		const jobsRepository = JobsRepository.getInstance()
		return await jobsRepository.findAllJobs()
	} catch (error) {
		throw new Error(`400 : Find all jobs is not successfully`)
	}
}

async function createJob(role: string, shipper_id: string, jobinfo: createJobDTO): Promise<string> {
	const jobsRepository = JobsRepository.getInstance()
	try {
		const job_id = await jobsRepository.createJob(jobinfo)
		if(job_id){
			await fetcher.account[role as keyof AccountFactoryInterface].updateJobHistory(shipper_id, job_id)
			return `201 : Create job is successfully`
		}
		throw new Error(`400 : Create job is not successfully`)
	} catch (err) {
		console.log(err)
		throw new Error(`400 : Create job is not successfully`)
	} 
}

// async function confirmedWithEmail(req: confirmedEmailDTO): Promise<string> {
// 	const jobsRepository = JobsRepository.getInstance()
// 	let { identifier, email } = req
// 	const account = await jobsRepository.findJobsByIdentifier(identifier)

// 	if (account) {
// 		try {
// 			await jobsRepository.updateEmailByIdentifier(identifier, email)
// 			return `200 : Comfirmed, Email is update successfully`
// 		} catch (error) {
// 			console.error(error)
// 			throw new Error(`400 : Save data is not successfully`)
// 		}
// 	}
// 	throw new Error(`404 : your username is not exist in database.`)
// }

// async function updateProfileJobsAccount(req: updateProfileDTO): Promise<string> {
// 	const jobsRepository = JobsRepository.getInstance()
// 	const { identifier, profile } = req

// 	try {
// 		await jobsRepository.updateProfileJobsAccountByIdentifier(identifier, profile)
// 		return `200 : Updated, Profile is update successfully`
// 	} catch (error) {
// 		console.error(error)
// 		throw new Error(`400 : Update profile is not successfully`)
// 	}
// }

// async function deleteJobsAccount(req: deleteDTO): Promise<string> {
// 	const jobsRepository = JobsRepository.getInstance()
// 	let { identifier, password } = req
// 	let hash: string | null

// 	try {
// 		hash = await jobsRepository.findPasswordHashedByIdentifier(identifier)
// 	} catch (error) {
// 		console.error(error)
// 		throw new Error(`404 : Invalid input, Your identifier is not exist`)
// 	}

// 	if (hash) {
// 		const match = await compareHashed(password, hash)
// 		if (match) {
// 			const deleteResult: number = await jobsRepository.deleteJobsAccount(identifier)
// 			if (deleteResult) return `200 : Delete account is successfully`
// 			throw new Error(`404 : Delete data is not successfully, don't have data in Database`)
// 		}
// 		throw new Error(`400 : Invalid input, Your password is not match`)
// 	}
// 	throw new Error(`404 : Invalid input, Your identifier is not exist`)
// }

// async function deActivateJobsAccount(req: deleteDTO): Promise<string> {
// 	const bias: string = '_deactivete'
// 	const jobsRepository = JobsRepository.getInstance()
// 	let { identifier, password } = req
// 	let hash: string | null

// 	try {
// 		hash = await jobsRepository.findPasswordHashedByIdentifier(identifier)
// 	} catch (error) {
// 		console.log(error)
// 		throw new Error(`404 : Invalid input, Your identifier is not exist`)
// 	}

// 	if (hash) {
// 		const match = await compareHashed(password, hash)
// 		if (match) {
// 			try {
// 				const shipprt_account = (await jobsRepository.findJobsByIdentifier(
// 					identifier,
// 				)) as JobsInterface
// 				const { username } = shipprt_account
// 				const nModified = await jobsRepository.deActivateJobsAccount(identifier, username, bias)
// 				if (nModified >= 1) return `200 : DeActivate account is successfully`
// 			} catch (err) {
// 				throw new Error(`400 : DeActivate account is not successfully`)
// 			}
// 			throw new Error(`404 : Some profile information is not exist in database`)
// 		}
// 		throw new Error(`400 : Invalid input, Your password is not match`)
// 	}
// 	throw new Error(`404 : Invalid input, Your identifier is not exist`)
// }

export default {
	createJob,
	findAllJobs
	// adminFindJobsByIdentifier,
	// updateProfileJobsAccount,
	// findProfileJobsAccountByUsername,
	// createJobsAccount,
	// confirmedWithEmail,
	// deleteJobsAccount,
	// deActivateJobsAccount,
}
