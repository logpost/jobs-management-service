import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import JobsUsecase from '../usecase/jobs.usecase'
import responseHandler from '../helper/response.handler'
import { Payload } from '../entities/dtos/token.dto'
import {
	createJobDTO,
	deleteJobDTO,
	updateJobInfoDTO,
	pickJobDTO,
	paramDetailJob,
	telDriverDTO,
	UserPermissionDTO,
} from '../entities/dtos/job.dto'

class JobsRoutes {
	public prefix_route = '/jobs'

	async routes(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) {
		fastify.get(`/healthcheck`, async (request, reply) => {
			responseHandler(async () => {
				return { healthcheck: 'server is alive' }
			}, reply)
			await reply
		})

		fastify.get(`/owned`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { username, role } = request.user as Payload
				const data = await JobsUsecase.findOwnedJobs(role, username)
				return data
			}, reply)
			await reply
		})

		fastify.get(`/all`, async (request, reply) => {
			responseHandler(async () => {
				let isLogposter = false
				const auth = request.headers?.authorization
				const token = auth?.split(' ')[1] as string

				if (token) {
					fastify.jwt.verify(token, (error: any, decoded: any) => {
						if (error) {
							throw new Error(`401 : Unauthorize, ${error.message}`)
						} else {
							isLogposter = true
						}
					})
				}
				const data = await JobsUsecase.findAllJobs(isLogposter)
				return data
			}, reply)
			await reply
		})

		fastify.get(`/detail/:job_id`, async (request, reply) => {
			responseHandler(async () => {
				let user: UserPermissionDTO | null = null

				const params = request.params as paramDetailJob
				const { job_id } = params

				const auth = request.headers?.authorization
				const token = auth?.split(' ')[1] as string

				if (token) {
					fastify.jwt.verify(token, (error: any, decoded: any) => {
						if (error) {
							user = {
								account: {
									role: 'guest',
								} as Payload,
								permission: 'guest',
							}
							throw new Error(`401 : Unauthorize, ${error.message}`)
						} else {
							user = { account: decoded, permission: 'logposter' }
						}
					})
				}

				if (!user) {
					const { driver_tel } = request.query as telDriverDTO
					if (driver_tel) {
						user = {
							account: {
								sub: driver_tel,
								role: 'driver',
							} as Payload,
							permission: 'guest',
						}
					} else {
						user = {
							account: {
								role: 'guest',
							} as Payload,
							permission: 'guest',
						}
					}
				}

				const data = await JobsUsecase.getDetailJob(user, job_id)
				return data
			}, reply)
			await reply
		})

		fastify.post(`/create`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { sub: shipper_id, display_name, role } = request.user as Payload
				if (role === 'shipper') {
					const info: createJobDTO = request.body as createJobDTO
					const jobinfo = { ...info, shipper_display_name: display_name, shipper_id }
					const data = await JobsUsecase.createJob(role, shipper_id, jobinfo)
					return data
				}
				throw new Error('400 : Not shipper account')
			}, reply)
			await reply
		})

		fastify.post(`/delete`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { sub: shipper_id, role } = request.user as Payload
				if (role === 'shipper') {
					const { job_id } = request.body as deleteJobDTO
					const data = await JobsUsecase.deleteJob(shipper_id, job_id)
					return data
				}
				throw new Error('400 : Not shipper account')
			}, reply)
			await reply
		})

		fastify.post(`/force/delete`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { sub: shipper_id, role } = request.user as Payload
				if (role === 'shipper') {
					const { job_id } = request.body as deleteJobDTO
					const data = await JobsUsecase.forceDeleteJob(shipper_id, job_id)
					return data
				}
				throw new Error('400 : Not shipper account')
			}, reply)
			await reply
		})

		fastify.post(`/pick`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const account = request.user as Payload
				const infopicked = request.body as pickJobDTO
				const { role } = account

				if (role === 'carrier') {
					const data = await JobsUsecase.pickJob(account, infopicked)
					return data
				}
				throw new Error('400 : Not shipper account')
			}, reply)
			await reply
		})

		fastify.put(`/update`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const info = request.body as updateJobInfoDTO
				const { role, ...profile } = request.user as Payload
				const { sub: identifier } = profile
				const data = await JobsUsecase.updateJobInfo(role, identifier, info)
				return data
			}, reply)
			await reply
		})

		fastify.put(`/driving/status`, async (request, reply) => {
			responseHandler(async () => {
				const info = request.body as updateJobInfoDTO
				const { driver_tel: identifier } = info
				const data = await JobsUsecase.updateJobInfo('driver', identifier, info)
				return data
			}, reply)
			await reply
		})

		done()
	}
}

export default JobsRoutes
