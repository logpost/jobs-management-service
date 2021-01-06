import * as mongoose from 'mongoose'
import CarrierSpecificationSchema from './carrier.spec.schema'
import LocationSchema from './location.schema'

export const JobSchema = new mongoose.Schema(
	{
		job_id: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true },
		shipper_id: { type: String, required: true },
		carrier_id: { type: String, default: null },
		driver_id: { type: String, default: null },
		truck_id: { type: String, default: null },
		owner_display_name: { type: String, required: true, default: '' },
		pickup_location: { type: LocationSchema, required: true }, // Google GPS Object (mock)
		dropoff_location: { type: LocationSchema, required: true }, // Google GPS Object (mock)
		pickup_date: { type: Date, required: true },
		dropoff_date: { type: Date, required: true },
		weight: { type: Number, required: true },
		carrier_specification: { type: CarrierSpecificationSchema, required: true }, // Spec's truck Object (mock)
		product_type: { type: String, default: '', required: true },
		offer_price: { type: Number, default: 0, required: true },
		auto_price: { type: Number, default: 0, required: true },
		description: { type: String, default: '' },
		status: { type: Number, default: 100, enum: [100, 200, 300, 400, 500, 600, 700, 800, 900], required: true },
		distance: { type: Number, default: 1, required: true },
		permission: { type: String, default: 'pubilc', enum: ['pubilc', 'private', 'delete'], required: true },
		waiting_time: { type: Number, default: 0, required: true },
		delete_at: { type: Date, default: new Date() },
	},
	{
		versionKey: false,
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	},
)
