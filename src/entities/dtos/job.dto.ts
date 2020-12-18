import { CarrierSpecificationInterface } from '../interfaces/data/carrier.spec.interface'

interface createJobDTO {
	shipper_id: string
	carrier_id?: string
	driver_id?: string
	truck_id?: string
	owner_display_name: string
	pickup_location?: string //***
	dropoff_location?: string //***
	pickup_date: Date
	dropoff_date: Date
	weight: number
	carrier_specification: CarrierSpecificationInterface
	product_type: string
	offer_price: number
	auto_price: number
	description?: string
	status: number
	distance: number
	permission: string
	waiting_time: number
}

interface deleteJobDTO {
	job_id: string
}

interface updateJobInfoDTO {
	job_id: string
	jobinfo: whitelistUpdateJobDTO
}

interface whitelistUpdateJobDTO {
	carrier_id?: string
	driver_id?: string
	truck_id?: string
	pickup_location?: string //***
	dropoff_location?: string //***
	pickup_date?: Date
	dropoff_date?: Date
	weight?: number
	carrier_specification?: CarrierSpecificationInterface
	product_type?: string
	offer_price?: number
	auto_price?: number
	description?: string
	status?: number
	distance?: number
	permission?: string
	waiting_time?: number
}

export { createJobDTO, updateJobInfoDTO, whitelistUpdateJobDTO, deleteJobDTO }
