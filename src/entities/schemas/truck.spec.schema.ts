import * as mongoose from 'mongoose'

const TruckTypeSchema = new mongoose.Schema(
    {
        wheel: { type: Number, require: true, default: 4 },
        options: { type: String, default: '' },
    },
    {
        _id: false,
        strict: false
    }
)

const TruckSpecificationSchema = new mongoose.Schema(
    {
        age: { type: Number, max: 10, default: 0 },
        type: { type: TruckTypeSchema },
    },
    {
        _id: false,
        strict: false,
    }
)

export default TruckSpecificationSchema