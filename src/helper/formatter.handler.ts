import { UserPermissionDTO } from '../entities/dtos/job.dto'
import { JobInterface } from '../entities/interfaces/data/job.interface'

class FormatterJob {
	private role: string
	private permission: string
	private account_type: string
	private job: JobInterface
	private guard: any

	private blacklist_fields = {
		logposter: {
			shipper: {
				personal: ['carrier_id', 'driver_id', 'truck_id', 'status', 'carrier_display_name', 'auto_price'],
				business: ['carrier_id', 'driver_id', 'truck_id', 'status', 'carrier_display_name', 'auto_price'],
			},
			carrier: {
				personal: ['carrier_id', 'driver_id', 'truck_id', 'status', 'carrier_display_name'],
				business: ['carrier_id', 'driver_id', 'truck_id', 'status', 'carrier_display_name'],
			},
		},
		owner: {
			shipper: {
				personal: ['auto_price'],
				business: ['auto_price'],
			},
			carrier: {
				personal: [],
				business: [],
			},
		},
		guest: {
			driver: ['offer_price', 'auto_price'],
			guest: [
				'carrier_id',
				'driver_id',
				'truck_id',
				'status',
				'carrier_display_name',
				'offer_price',
				'auto_price',
			],
		},
	} as any

	constructor(user: UserPermissionDTO, job: JobInterface) {
		const {
			account: { role, account_type },
			permission,
		} = user

		this.job = JSON.parse(JSON.stringify(job))
		this.role = role
		this.permission = permission
		this.account_type = account_type

		this.guard = this.createGuard()
	}

	public getter() {
		return this.transform()
	}

	private createGuard() {
		if (this.permission === 'guest') {
			return this.blacklist_fields[this.permission][this.role]
		}
		return this.blacklist_fields[this.permission][this.role][this.account_type]
	}

	private async transform() {
		let dataParsed: any = {}

		const promise = Object.keys(this.job).map((key) => {
			if (this.guard.includes(key)) {
				return
			}
			dataParsed[key] = this.job[key as keyof JobInterface]
		})
		await Promise.all(promise)
		return dataParsed
	}
}

export default FormatterJob
