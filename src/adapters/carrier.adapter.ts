import axios from 'axios'
import config from '../config/config'
import { AccountIdentifier } from '../entities/interfaces/data/account.interface'
class CarrierAdapter {
	private prefix = config.carrier.api.prefix_route
	private prefix_driver = `/driver`
	private prefix_truck = `/truck`
	private prefix_job = `/job`
	private fetcher = axios.create({
		baseURL: config.carrier.api.base_url,
		headers: {
			common: {
				Authorization: `bearer ${config.app.token}`,
			},
		},
	})

	/* 
        CARRIER ADAPTER
    */

	findAccountByUsername = async (username: string) => {
		try {
			const res = await this.fetcher.get(`${this.prefix}/srv/profile/${username}`)
			return res
		} catch (error) {
			console.log(error)
			return error.response.data
		}
	}

	/* 
        JOB HISTORY ADAPTER
    */

	addJobHistory = async (identifier: AccountIdentifier, job_id: string) => {
		try {
			const res = await this.fetcher.put(`${this.prefix_job}/srv/history/add`, { identifier, job_id })
			return res
		} catch (error) {
			console.log(error)
			return error.response.data
		}
	}

	deleteJobHistory = async (identifier: AccountIdentifier, job_id: string) => {
		try {
			const res = await this.fetcher.put(`${this.prefix_job}/srv/history/delete`, { identifier, job_id })
			return res
		} catch (error) {
			console.log(error)
			return error.response.data
		}
	}

	getJobHistory = async (identifier: AccountIdentifier) => {
		try {
			const res = await this.fetcher.post(`${this.prefix_job}/srv/history/all`, { identifier })
			return res
		} catch (error) {
			console.log(error)
			return error.response.data
		}
	}

	/* 
        DRIVER ADAPTER
    */

	findDriverByFiltering = async (identifier: AccountIdentifier, query: any) => {
		try {
			const res = await this.fetcher.post(`${this.prefix_driver}/srv/filter`, { identifier, query })
			return res
		} catch (error) {
			return error.response.data
		}
	}

	updateDriverStatus = async (identifier: AccountIdentifier, driver: any) => {
		try {
			const res = await this.fetcher.put(`${this.prefix_driver}/srv/update`, { identifier, ...driver })
			return res
		} catch (error) {
			return error.response.data
		}
	}

	/* 
        TRUCK ADAPTER
    */

	findTruckByFiltering = async (identifier: AccountIdentifier, query: any) => {
		try {
			const res = await this.fetcher.post(`${this.prefix_truck}/srv/filter`, { identifier, query })
			return res
		} catch (error) {
			return error.response.data
		}
	}

	updateTruckStatus = async (identifier: AccountIdentifier, truck: any) => {
		try {
			const res = await this.fetcher.put(`${this.prefix_truck}/srv/update`, { identifier, ...truck })
			return res
		} catch (error) {
			return error.response.data
		}
	}
}

export default new CarrierAdapter()
