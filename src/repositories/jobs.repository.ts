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

	public async findJobsByJobId(job_id: string): Promise<JobInterface | null> {
		const result: JobInterface | null = await this._model.findOne(
			{ job_id },
			{
				_id: 0,
				created_at: 0,
				updated_at: 0,
			},
		)
		return result
	}

	public async findAllJobs(): Promise<JobInterface[]> {
		return await this._model.find({})
	}

	public async createJob(jobinfo: createJobDTO): Promise<string> {
		const mongooseModel = new this._model(jobinfo)
		const { job_id } = await mongooseModel.save()
		return job_id as string
	}

	public async updateJobsInfoByJobId(job_id: string, jobinfo: whitelistUpdateJobDTO): Promise<number> {
		const result = await this._model.updateOne({ job_id }, { $set: jobinfo })
		return result.n
	}

	public async forceDeleteJob(job_id: string): Promise<number> {
		const result = await this._model.deleteOne({ job_id })
		return result.deletedCount as number
	}
}

export default JobsRepository
