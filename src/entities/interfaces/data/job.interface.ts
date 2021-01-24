import { Document } from 'mongoose'
import { CarrierSpecificationInterface } from './carrier.spec.interface'
import { LocationInterface } from './location.interface'

interface JobDocument extends Document {
	readonly job_id: string
	readonly shipper_id: string
	readonly carrier_id: string
	readonly driver_id: string
	readonly truck_id: string
	readonly shipper_display_name: string
	readonly carrier_display_name: string
	readonly driver_name: string
	readonly license_number: string
	readonly pickup_location: LocationInterface
	readonly dropoff_location: LocationInterface
	readonly pickup_date: Date
	readonly dropoff_date: Date
	readonly duration: number
	readonly weight: number
	readonly carrier_specification: CarrierSpecificationInterface
	readonly product_type: string
	readonly offer_price: number
	readonly auto_price: number
	readonly description: string
	readonly status: number
	readonly distance: number
	readonly permission: string
	readonly waiting_time: number
	readonly created_at: Date
	readonly updated_at: Date
	readonly delete_at: Date
}

type JobInterface = JobDocument

export { JobInterface }
