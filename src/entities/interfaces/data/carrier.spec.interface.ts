import { TruckSpecificationInterface } from './truck.spec.interface'
import { DriverSpecificationInterface } from './driver.spec.interface'

export interface CarrierSpecificationInterface { 
    truck:  TruckSpecificationInterface 
    driver: DriverSpecificationInterface 
}
