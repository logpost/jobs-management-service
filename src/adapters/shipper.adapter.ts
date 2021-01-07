import axios from 'axios'
import config from '../config/config'
import { AccountIdentifier } from '../entities/interfaces/data/account.interface'

class ShipperAdapter {
	private prefix = config.shipper.api.prefix_route
	private prefix_job = `/job`
	private fetcher = axios.create({
		baseURL: config.shipper.api.base_url,
		headers: {
			common: {
				Authorization: `bearer ${config.app.token}`,
			},
		},
	})

	/* 
        JOB HISTORY ADAPTER
    */

	addJobHistory = async (identifier: AccountIdentifier, job_id: string) => {
		try {
			const res = await this.fetcher.put(`${this.prefix_job}/srv/history/add`, { identifier, job_id })
			return res
		} catch (error) {
			return error.response.data
		}
	}

	deleteJobHistory = async (identifier: AccountIdentifier, job_id: string) => {
		try {
			const res = await this.fetcher.put(`${this.prefix_job}/srv/history/delete`, { identifier, job_id })
			return res
		} catch (error) {
			return error.response.data
		}
	}

	getJobHistory = async (identifier: AccountIdentifier) => {
		try {
			const res = await this.fetcher.put(`${this.prefix_job}/srv/history/all`, { identifier })
			return res
		} catch (error) {
			return error.response.data
		}
	}
}

export default new ShipperAdapter()
