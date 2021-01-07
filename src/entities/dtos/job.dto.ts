import { CarrierSpecificationInterface } from '../interfaces/data/carrier.spec.interface'
import { LocationInterface } from '../interfaces/data/location.interface'
interface createJobDTO {
	shipper_id: string
	carrier_id?: string
	driver_id?: string
	truck_id?: string
	shipper_display_name: string
	carrier_display_name?: string
	pickup_location: LocationInterface
	dropoff_location: LocationInterface
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
interface pickJobDTO {
	job_id: string
	driver_id: string
	truck_id: string
}

interface whitelistPickerJobDTO {
	carrier_id: string
}
interface updateJobInfoDTO {
	job_id: string
	driver_tel?: string | undefined
	jobinfo: whitelistUpdateJobDTO
}
interface whitelistUpdateJobForCarrierDTO {
	driver_id?: string
	truck_id?: string
	carrier_display_name?: string
	status?: number
}
interface whitelistUpdateJobForShipperDTO {
	pickup_location?: LocationInterface
	dropoff_location?: LocationInterface
	pickup_date?: Date
	dropoff_date?: Date
	weight?: number
	carrier_specification?: CarrierSpecificationInterface
	product_type?: string
	offer_price?: number
	description?: string
	status?: number
	distance?: number
	permission?: string
	waiting_time?: number
}
interface whitelistUpdateJobForDriverDTO {
	status: number
}

type whitelistUpdateJobDTO =
	| whitelistUpdateJobForCarrierDTO
	| whitelistUpdateJobForShipperDTO
	| whitelistUpdateJobForDriverDTO
	| whitelistPickerJobDTO // only carrier

export {
	createJobDTO,
	deleteJobDTO,
	pickJobDTO,
	updateJobInfoDTO,
	whitelistUpdateJobDTO,
	whitelistUpdateJobForCarrierDTO,
	whitelistUpdateJobForShipperDTO,
	whitelistUpdateJobForDriverDTO,
}
