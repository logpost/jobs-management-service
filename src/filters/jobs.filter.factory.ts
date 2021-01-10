import { JobInterface } from '../entities/interfaces/data/job.interface'
import { queryJobDTO } from '../entities/dtos/job.dto'

class JobFilterFactory {
	public filterer = {
		job_id: (job: JobInterface, query: string) => {
			return job.job_id.toString() === query
		},
		shipper_id: (job: JobInterface, query: string) => {
			return job.shipper_id.toString() === query
		},
		carrier_id: (job: JobInterface, query: string) => {
			return job.carrier_id.toString() === query
		},
		driver_id: (job: JobInterface, query: string) => {
			return job.driver_id.toString() === query
		},
		truck_id: (job: JobInterface, query: string) => {
			return job.truck_id.toString() === query
		},
		shipper_display_name: (job: JobInterface, query: string) => {
			return job.shipper_display_name === query
		},
		carrier_display_name: (job: JobInterface, query: string) => {
			return job.carrier_display_name === query
		},
		'pickup_location.address': (job: JobInterface, query: string) => {
			return job.pickup_location.address === query
		},
		'pickup_location.province': (job: JobInterface, query: string) => {
			return job.pickup_location.province === query
		},
		'pickup_location.district': (job: JobInterface, query: string) => {
			return job.pickup_location.district === query
		},
		'pickup_location.zipcode': (job: JobInterface, query: string) => {
			return job.pickup_location.zipcode === query
		},
		'pickup_location.latitude': (job: JobInterface, query: string) => {
			return job.pickup_location.latitude === parseInt(query, 10)
		},
		'pickup_location.longitude': (job: JobInterface, query: string) => {
			return job.pickup_location.longitude === parseInt(query, 10)
		},
		'dropoff_location.address': (job: JobInterface, query: string) => {
			return job.dropoff_location.address === query
		},
		'dropoff_location.province': (job: JobInterface, query: string) => {
			return job.dropoff_location.province === query
		},
		'dropoff_location.district': (job: JobInterface, query: string) => {
			return job.dropoff_location.district === query
		},
		'dropoff_location.zipcode': (job: JobInterface, query: string) => {
			return job.dropoff_location.zipcode === query
		},
		'dropoff_location.latitude': (job: JobInterface, query: string) => {
			return job.dropoff_location.latitude === parseInt(query, 10)
		},
		'dropoff_location.longitude': (job: JobInterface, query: string) => {
			return job.dropoff_location.longitude === parseInt(query, 10)
		},
		weight: (job: JobInterface, query: string) => {
			return job.weight === parseInt(query, 10)
		},
		pickup_date: (job: JobInterface, query: string) => {
			return new Date(job.pickup_date).getTime() === new Date(query).getTime()
		},
		dropoff_date: (job: JobInterface, query: string) => {
			return new Date(job.dropoff_date).getTime() === new Date(query).getTime()
		},
		'carrier_specification.truck.age': (job: JobInterface, query: string) => {
			return job.carrier_specification.truck.age === parseInt(query, 10)
		},
		'carrier_specification.truck.property.type': (job: JobInterface, query: string) => {
			return job.carrier_specification.truck.property.type === query
		},
		'carrier_specification.truck.property.option': (job: JobInterface, query: string) => {
			return job.carrier_specification.truck.property.option === query
		},
		'carrier_specification.truck.property.chassis': (job: JobInterface, query: string) => {
			return job.carrier_specification.truck.property.chassis === parseInt(query, 10)
		},
		'carrier_specification.driver.driver_license_type': (job: JobInterface, query: string) => {
			return job.carrier_specification.driver.driver_license_type === query
		},
		product_type: (job: JobInterface, query: string) => {
			return job.product_type === query
		},
		offer_price: (job: JobInterface, query: string) => {
			return job.offer_price === parseInt(query, 10)
		},
		auto_price: (job: JobInterface, query: string) => {
			return job.auto_price === parseInt(query, 10)
		},
		description: (job: JobInterface, query: string) => {
			return job.description === query
		},
		status: (job: JobInterface, query: string) => {
			return job.status === parseInt(query, 10)
		},
		distance: (job: JobInterface, query: string) => {
			return job.distance === parseInt(query, 10)
		},
		permission: (job: JobInterface, query: string) => {
			return job.permission === query
		},
		waiting_time: (job: JobInterface, query: string) => {
			return job.waiting_time === parseInt(query, 10)
		},
	} as any

	public async filterByQuery(jobs: JobInterface[], query: queryJobDTO): Promise<JobInterface[]> {
		return JSON.parse(JSON.stringify(jobs)).filter((job: JobInterface) => {
			return Object.keys(query).every((key) => {
				return this.filterer[key](job, query[key as keyof queryJobDTO] as string)
			})
		})
	}
}

export default new JobFilterFactory()
