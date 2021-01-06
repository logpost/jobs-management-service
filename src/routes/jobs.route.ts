import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import JobsUsecase from '../usecase/jobs.usecase'
import responseHandler from '../helper/response.handler'
import { Payload } from '../entities/dtos/token.dto'
import { createJobDTO, deleteJobDTO, updateJobInfoDTO, pickJobDTO } from '../entities/dtos/job.dto'
import * as Validator from '../helper/validate.helper'
import { profile } from 'console'

class JobsRoutes {
	public prefix_route = '/jobs'

	async routes(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) {
		fastify.get(`/healthcheck`, async (request, reply) => {
			responseHandler(async () => {
				return { healthcheck: 'server is alive' }
			}, reply)
			await reply
		})

		fastify.get(`/all`, async (request, reply) => {
			responseHandler(async () => {
				const data = await JobsUsecase.findAllJobs()
				return data
			}, reply)
			await reply
		})

		fastify.post(`/create`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { sub: shipper_id, display_name, role } = request.user as Payload
				if (role === 'shipper') {
					const info: createJobDTO = request.body as createJobDTO
					const jobinfo = { ...info, owner_display_name: display_name, shipper_id }
					const data = await JobsUsecase.createJob(role, shipper_id, jobinfo)
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
