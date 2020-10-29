export interface TruckTypeInterface {
    wheel: number
    options: string
}

export interface TruckSpecificationInterface {
    age: number
    type: TruckTypeInterface
}
