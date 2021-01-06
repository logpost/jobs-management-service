import { Whitelists } from '../interfaces/data/whitelist.interface'

export const whitelist: Whitelists = {
	shipper: {
		pickup_location: { field: 'pickup_location' },
		dropoff_location: { field: 'dropoff_location' },
		pickup_date: { field: 'pickup_date' },
		dropoff_date: { field: 'dropoff_date' },
		weight: { field: 'weight' },
		carrier_specification: { field: 'carrier_specification' },
		product_type: { field: 'product_type' },
		offer_price: { field: 'offer_price' },
		description: { field: 'description' },
		status: { field: 'status' },
		distance: { field: 'distance' },
		permission: { field: 'permission' },
		waiting_time: { field: 'waiting_time' },
	},
	carrier: {
		driver_id: { field: 'driver_id' },
		truck_id: { field: 'truck_id' },
		status: { field: 'status' },
	},
	driver: {
		status: { field: 'status' },
	},
}
