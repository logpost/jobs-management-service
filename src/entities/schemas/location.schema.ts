import * as mongoose from 'mongoose'

const LocationSchema = new mongoose.Schema(
	{
		address: { type: String, default: '', trim: true },
		province: { type: String, default: '', trim: true },
		district: { type: String, default: '', trim: true },
		zipcode: { type: String, default: '', trim: true },
		latitude: { type: Number, default: 0 },
		longitude: { type: Number, default: 0 },
	},
	{
		_id: false,
		strict: false,
	},
)

export default LocationSchema
