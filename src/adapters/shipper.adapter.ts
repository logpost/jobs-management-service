import axios from 'axios'
import config from '../config/config'
import { AccountIdentifier } from '../entities/interfaces/data/account.interface'

class ShipperAdapter {
	private prefix = config.shipper.api.prefix_route
	private fetcher = axios.create({
		baseURL: config.shipper.api.base_url,
		headers: {
			common: {
				Authorization: `bearer ${config.app.token}`,
			},
		},
	})

	updateJobHistory = async (identifier: AccountIdentifier, job_id: string) => {
		try {
			const res = await this.fetcher.put(`${this.prefix}/srv/job/history/add`, { identifier, job_id })
			return res
		} catch (error) {
			return error.response.data
		}
	}
}

export default new ShipperAdapter()
