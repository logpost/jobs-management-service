import { UserPermissionDTO } from '../entities/dtos/job.dto'
import { JobInterface } from '../entities/interfaces/data/job.interface'

class FormatterJob {
	private is_bulk: boolean = false
	private role: string
	private permission: string
	private account_type: string
	private job: JobInterface | JobInterface[]
	private guard: any

	private blacklist_fields = {
		logposter: {
			shipper: {
				personal: [
					'carrier_id',
					'driver_id',
					'truck_id',
					'status',
					'carrier_display_name',
					'auto_price',
					'driver_name',
					'license_number',
				],
				business: [
					'carrier_id',
					'driver_id',
					'truck_id',
					'status',
					'carrier_display_name',
					'auto_price',
					'driver_name',
					'license_number',
				],
			},
			carrier: {
				personal: [
					'carrier_id',
					'driver_id',
					'truck_id',
					'status',
					'carrier_display_name',
					'driver_name',
					'license_number',
				],
				business: [
					'carrier_id',
					'driver_id',
					'truck_id',
					'status',
					'carrier_display_name',
					'driver_name',
					'license_number',
				],
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
				'driver_name',
				'license_number',
				'offer_price',
				'auto_price',
			],
		},
	} as any

	constructor(user: UserPermissionDTO, job: JobInterface | JobInterface[]) {
		const {
			account: { role, account_type },
			permission,
		} = user

		if (Array.isArray(job)) {
			this.job = [...job]
			this.is_bulk = true
		} else {
			this.job = JSON.parse(JSON.stringify(job))
		}

		this.role = role
		this.permission = permission
		this.account_type = account_type

		this.guard = this.createGuard()
	}

	public async getter() {
		if (!this.is_bulk) return await this.transformOne()
		return await this.transformMany()
	}

	private createGuard() {
		if (this.permission === 'guest') {
			return this.blacklist_fields[this.permission][this.role]
		}
		return this.blacklist_fields[this.permission][this.role][this.account_type]
	}

	private async transformOne() {
		let jobParsed: any = {}

		const promise = Object.keys(this.job).map((key) => {
			if (this.guard.includes(key)) {
				return
			}
			jobParsed[key] = (this.job as JobInterface)[key as keyof JobInterface]
		})
		await Promise.all(promise)
		return jobParsed
	}

	private async transformMany() {
		let jobsParsed: any = []
		const promise = (this.job as JobInterface[]).map(async (task: JobInterface) => {
			let jobParsed: any = {}
			const promise = Object.keys(task).map((key) => {
				if (this.guard.includes(key)) {
					return
				}
				jobParsed[key] = task[key as keyof JobInterface] as JobInterface
			})
			await Promise.all(promise)
			jobsParsed.push(jobParsed)
		})
		await Promise.all(promise)
		return jobsParsed
	}
}

export default FormatterJob
