export interface TruckPropertyInterface {
	type: string
	option: string
	chassis?: number
}
export interface TruckSpecificationInterface {
	age: number
	property: TruckPropertyInterface
}
