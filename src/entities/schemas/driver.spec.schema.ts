import * as mongoose from 'mongoose'

const DriverSpecificationSchema = new mongoose.Schema(
    {
        driver_license_type: { type: String, required: true, trim: true},
    },
    {
        _id: false,
        strict: false,
    }
)

export default DriverSpecificationSchema