import * as mongoose from 'mongoose'

import TruckSpecificationSchema from './truck.spec.schema'  
import DriverSpecificationSchema from './driver.spec.schema'

const CarrierSpecificationSchema = new mongoose.Schema(
    {
        truck: { type: TruckSpecificationSchema },
        driver: { type: DriverSpecificationSchema }
    },
    {
        _id: false,
        strict: false,
    }
)

export default CarrierSpecificationSchema


