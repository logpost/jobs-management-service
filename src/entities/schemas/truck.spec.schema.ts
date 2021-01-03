import * as mongoose from 'mongoose'

const TruckPropertySchema = new mongoose.Schema(
	{
		type: { type: String, required: true },
		option: { type: String, required: true },
		chassis: { type: Number, default: 0 },
	},
	{
		_id: false,
		strict: false,
	},
)

const TruckSpecificationSchema = new mongoose.Schema(
	{
		age: { type: Number, max: 10, default: 0 },
		property: { type: TruckPropertySchema },
	},
	{
		_id: false,
		strict: false,
	},
)

export default TruckSpecificationSchema
