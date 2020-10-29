import { model, Model } from 'mongoose'
import config from '../config/config'
import { JobInterface } from '../entities/interfaces/data/job.interface'
import { JobSchema } from '../entities/schemas/job.schema'

import { createJobDTO, whitelistUpdateJobDTO } from '../entities/dtos/job.dto'

class JobsRepository {
	private static instance: JobsRepository
	private _model: Model<JobInterface>
	private _collection: string

	constructor() {
		this._collection = config.db.mongo.collection!
		this._model = model<JobInterface>(this._collection, JobSchema)
	}

	public static getInstance(): JobsRepository {
		if (!JobsRepository.instance) {
			JobsRepository.instance = new JobsRepository()
		}
		return JobsRepository.instance
	}

	// // ##### SERVICE REPOSITORY

	// public async adminFindJobsByIdentifier(identifier: identifierDTO): Promise<JobInterface | null> {
	// 	const result: JobInterface | null = await this._model.findOne(identifier)
	// 	return result
	// }

	// // ##### CARRIER REPOSITORY

	// public async findJobsByIdentifier(identifier: identifierDTO): Promise<JobInterface | null> {
	// 	const result: JobInterface | null = await this._model.findOne(identifier, {
	// 		_id: 0,
	// 		password: 0,
	// 		created_at: 0,
	// 		updated_at: 0,
	// 	})
	// 	return result
	// }

	public async findAllJobs(): Promise<JobInterface[]> {
		return await this._model.find({})
	}

	public async createJob(jobinfo: createJobDTO): Promise<string> {
		const mongooseModel = new this._model(jobinfo)
		const { _id: job_id } = await mongooseModel.save()
		return job_id as string
	}

	// public async updateEmailByIdentifier(identifier: identifierDTO, email: string): Promise<string> {
	// 	const { _id: jobs_id } = await this._model.updateOne(identifier, { $set: { email } })
	// 	return jobs_id as string
	// }

	// public async updateProfileJobsAccountByIdentifier(
	// 	identifier: identifierDTO,
	// 	profile: whitelistupdateProfileDTO,
	// ): Promise<string> {
	// 	const { _id: jobs_id } = await this._model.updateOne(identifier, { $set: profile })
	// 	return jobs_id as string
	// }

	// public async deleteJobsAccount(identifier: identifierDTO): Promise<number> {
	// 	const result = await this._model.deleteOne(identifier)
	// 	return result.deletedCount as number
	// }

	// public async deActivateJobsAccount(identifier: identifierDTO, username: string, bias: string): Promise<number> {
	// 	const result = await this._model.updateOne(identifier, { $set: { username: bias + username } })
	// 	return result.nModified as number
	// }

	// // ##### TRUCK REPOSITORY

	// public async findTruckExistOnUsernameByLicenseNumber(
	// 	username: string,
	// 	license_number: string,
	// ): Promise<JobInterface | null> {
	// 	const result = (await this._model.findOne({
	// 		username,
	// 		'trucks.license_number': license_number,
	// 	})) as JobInterface
	// 	return result
	// }

	// public async createTruckByUsername(username: string, truckinfo: createTruckDTO): Promise<string> {
	// 	const { truck_id } = await this._model.update({ username }, { $push: { trucks: truckinfo as any } })
	// 	return truck_id
	// }

	// public async updateTruckByTruckIdAndUsername(username: string, truck_id: string, query: any): Promise<string> {
	// 	const { _id: jobs_id } = await this._model.update({ username, 'trucks.truck_id': truck_id }, { $set: query })
	// 	return jobs_id as string
	// }

	// public async deleteTruckByTruckIdAndUsername(username: string, truck_id: string): Promise<string> {
	// 	const { _id: jobs_id } = await this._model.update(
	// 		{ username },
	// 		{ $pull: { trucks: { truck_id: truck_id } as any } },
	// 	)
	// 	return jobs_id as string
	// }

	// // ##### DRIVER REPOSITORY

	// public async findDriverExistOnUsernameByLicenseNumber(
	// 	username: string,
	// 	driver_license: string,
	// ): Promise<JobInterface | null> {
	// 	const result = (await this._model.findOne({
	// 		username,
	// 		'drivers.driver_license': driver_license,
	// 	})) as JobInterface
	// 	return result
	// }

	// public async createDriverByUsername(username: string, driverinfo: createDriverDTO): Promise<string> {
	// 	console.log(username, driverinfo)
	// 	const { driver_id } = await this._model.update({ username }, { $push: { drivers: driverinfo as any } })
	// 	return driver_id
	// }

	// public async updateDriverByDriverIdAndUsername(username: string, driver_id: string, query: any): Promise<string> {
	// 	const { _id: jobs_id } = await this._model.update({ username, 'drivers.driver_id': driver_id }, { $set: query })
	// 	return jobs_id as string
	// }

	// public async deleteDriverByDriverIdAndUsername(username: string, driver_id: string): Promise<string> {
	// 	const { _id: jobs_id } = await this._model.update(
	// 		{ username },
	// 		{ $pull: { drivers: { driver_id: driver_id } as any } },
	// 	)
	// 	return jobs_id as string
	// }
}

export default JobsRepository
