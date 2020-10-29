import axios from 'axios'
import config from '../config/config'

class ShipperAdapter {

    private prefix = config.shipper.api.prefix_route
    private fetcher = axios.create({
        baseURL: config.shipper.api.base_url,
        headers: {
            common: {
                'Authorization': `bearer ${config.app.token}`
            }
        }
    });

    updateJobHistory = async (shipper_id: string, job_id: string) => {
        try {
            const res = await this.fetcher.put(`${this.prefix}/job/push`, { shipper_id, job_id })
            return res
        } catch (error) {
            return error.response.data
        }
    }
}

export default new ShipperAdapter()