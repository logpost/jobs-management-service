import { JobInterface } from '../entities/interfaces/data/job.interface'
import { queryJobDTO } from '../entities/dtos/job.dto'

class JobFilterFactory {
	public filterer = {
		job_id: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.job_id.toString() === query)
		},
		shipper_id: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.shipper_id.toString() === query)
		},
		carrier_id: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.carrier_id.toString() === query)
		},
		driver_id: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.driver_id.toString() === query)
		},
		truck_id: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.truck_id.toString() === query)
		},
		shipper_display_name: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.shipper_display_name === query)
		},
		carrier_display_name: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.carrier_display_name === query)
		},
		// 'pickup_location.address': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.pickup_location.address === query)
		// },
		// 'pickup_location.province': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.pickup_location.province === query)
		// },
		// 'pickup_location.district': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.pickup_location.district === query)
		// },
		// 'pickup_location.zipcode': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.pickup_location.zipcode === query)
		// },
		// 'pickup_location.latitude': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.pickup_location.latitude === parseInt(query, 10))
		// },
		// 'pickup_location.longitude': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.pickup_location.longitude === parseInt(query, 10))
		// },
		// 'dropoff_location.address': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.dropoff_location.address === query)
		// },
		// 'dropoff_location.province': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.dropoff_location.province === query)
		// },
		// 'dropoff_location.district': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.dropoff_location.district === query)
		// },
		// 'dropoff_location.zipcode': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.dropoff_location.zipcode === query)
		// },
		// 'dropoff_location.latitude': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.dropoff_location.latitude === parseInt(query, 10))
		// },
		// 'dropoff_location.longitude': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.dropoff_location.longitude === parseInt(query, 10))
		// },
		weight: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.weight === parseInt(query, 10))
		},
		pickup_date: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => new Date(job.pickup_date).getTime() === new Date(query).getTime())
		},
		dropoff_date: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => new Date(job.dropoff_date).getTime() === new Date(query).getTime())
		},
		// 'carrier_specification.truck.age': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.carrier_specification.truck.age === parseInt(query, 10))
		// },
		// 'carrier_specification.truck.property.type': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.carrier_specification.truck.property.type === query)
		// },
		// 'carrier_specification.truck.property.option': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.carrier_specification.truck.property.option === query)
		// },
		// 'carrier_specification.truck.property.chassis': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.carrier_specification.truck.property.chassis === parseInt(query, 10))
		// },
		// 'carrier_specification.driver.driver_license_type': (jobs: JobInterface[], query: string) => {
		// 	return jobs.filter((job) => job.carrier_specification.driver.driver_license_type === query)
		// },
		product_type: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.product_type === query)
		},
		offer_price: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.offer_price === parseInt(query, 10))
		},
		auto_price: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.auto_price === parseInt(query, 10))
		},
		description: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.description === query)
		},
		status: async (jobs: JobInterface[], query: string) => {
			return await Promise.all(jobs.filter((job) => job.status === parseInt(query, 10)))
		},
		distance: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.distance === parseInt(query, 10))
		},
		permission: async (jobs: JobInterface[], query: string) => {
			return await Promise.all(jobs.filter((job) => job.permission === query))
		},
		waiting_time: (jobs: JobInterface[], query: string) => {
			return jobs.filter((job) => job.waiting_time === parseInt(query, 10))
		},
	} as any

	public async filterByQuery(jobs: JobInterface[], query: queryJobDTO): Promise<JobInterface[]> {
		await Promise.all(
			Object.keys(query).map(async (key: any) => {
				jobs = await this.filterer[key](
					JSON.parse(JSON.stringify(jobs)),
					query[key as keyof queryJobDTO] as string,
				)
			}),
		)

		return jobs
	}
}

export default new JobFilterFactory()
