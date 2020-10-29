import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import JobsUsecase from '../usecase/jobs.usecase'
import responseHandler from '../helper/response.handler'
import { Payload } from '../entities/dtos/token.dto'
import { createJobDTO,  deleteJobDTO,  whitelistUpdateJobDTO} from '../entities/dtos/job.dto'
import * as Validator from '../helper/validate.helper'

class JobsRoutes {
  public prefix_route = '/jobs'

  async routes(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) {

    fastify.get(`/healthcheck`, async (request, reply) => {
		responseHandler(async () => {
			return {healthcheck: "server is alive"}
		}, reply)
		await reply
	})

    // fastify.get(`/admin/profile/:username`, { preValidation: [(fastify as any).authenticate] }, async (request, reply) => {
    //   responseHandler(async () => {
    //     const param: identifierDTO = request.params as identifierDTO   
    //     const data = await JobsUsecase.adminFindJobsByIdentifier(param)
    //     return data
    //   }, reply)
    //   await reply
    // })

    // fastify.get(`/profile/:username`, async (request, reply) => {
    //   responseHandler(async () => {
    //     const param: identifierDTO = request.params as identifierDTO   
    //     const data = await JobsUsecase.findProfileJobsAccountByUsername(param)
    //     return data
    //   }, reply)
    //   await reply
    // })

    fastify.get(`/all`, async (request, reply) => {
      responseHandler(async () => {
        const data = await JobsUsecase.findAllJobs()
        return data
      }, reply)
      await reply
    })

    fastify.post(`/create`, { preValidation: [(fastify as any).authenticate] }, async (request, reply) => {
		responseHandler(async () => {
			const { sub: shipper_id, display_name, role } = request.user as Payload
			if(role === 'shipper'){
				const info : createJobDTO = request.body as createJobDTO   
				const jobinfo = { ...info, owner_display_name: display_name, shipper_id}
				const data = await JobsUsecase.createJob(role, shipper_id, jobinfo)
				return data
			}
			throw new Error('400 : Not shipper account')
		}, reply)
		await reply
	})
    
    // // This route have vulnerability at client, we should use this route service to service for policy.
    // fastify.put(`/confirmed_email`, { preValidation: [(fastify as any).authenticate] }, async (request, reply) => {
    //   responseHandler(async () => {
    //     const req: confirmedEmailDTO = request.body as confirmedEmailDTO
    //     let { email, identifier } = req 
        
    //     if(!email)
    //       throw new Error(`400 : Invalid input, Please input field email`)  

    //     if('username' in identifier || 'jobs_id' in identifier){
    //       const data = await JobsUsecase.confirmedWithEmail(req)
    //       return data  
    //     } else {
    //       throw new Error(`400 : Invalid input, Please input field username or account id`)  
    //     }
        
    //   }, reply)
    //   await reply
    // })

    // fastify.delete(`/force_delete`, { preValidation: [(fastify as any).authenticate] }, async (request, reply) => {
    //   responseHandler(async () => {
    //     const req: deleteDTO = request.body as deleteDTO
    //     const { username } = request.user as Payload
    //     const identifier: identifierDTO  = { username }
    //     let data

    //     if(identifier.username || identifier.jobs_id)
    //       data = await JobsUsecase.deleteJobsAccount({ ...req, identifier})
    //     else 
    //       throw new Error(`400 : Invalid input, Input not exist account id or password field`)  
    //     return data

    //   }, reply)
    //   await reply
    // })

    // fastify.put(`/delete`, { preValidation: [(fastify as any).authenticate] }, async (request, reply) => {
    //   responseHandler(async () => {
    //     const req: deleteDTO = request.body as deleteDTO
    //     const { username } = request.user as Payload
    //     const identifier: identifierDTO  = { username }
    //     let data

    //     if(identifier.username || identifier.jobs_id)
    //       data = await JobsUsecase.deActivateJobsAccount({ ...req, identifier })
    //     else 
    //       throw new Error(`400 : Invalid input, Input not exist account id or password field`) 
    //     return data
    //   }, reply)
    //   await reply
    // })

    // fastify.put(`/profile/update`, { preValidation: [(fastify as any).authenticate] }, async (request, reply) => {
    //   responseHandler(async () => {
    //     const { username } = request.user as Payload
    //     const identifier: identifierDTO  = { username }
    //     const profile: whitelistupdateProfileDTO = request.body as whitelistupdateProfileDTO

    //     if(identifier.username || identifier.jobs_id){
    //       const errorFieldsUpdate = Validator.validUpdatedFields(profile, 'jobs')
    //       if (errorFieldsUpdate.length > 0) 
    //         throw new Error(`400 : Invalid Fields! ${errorFieldsUpdate.join(', ')}`)
    //     } else{
    //       throw new Error(`400 : Invalid input, Input not exist account id or password field`) 
    //     }

    //     const data = await JobsUsecase.updateProfileJobsAccount({ identifier, profile })
    //     return data
    //   }, reply)
    //   await reply
    // })

    done()
  }
}

export default JobsRoutes
