import { JobInterface } from '../entities/interfaces/data/job.interface'
import AccountRepository from '../repositories/account.repository'
import { hashing, compareHashed } from '../helper/hashing.handler'
import { createJobDTO, updateJobInfoDTO, deleteJobDTO } from '../entities/dtos/job.dto'

// async function adminFindJobsByIdentifier(identifier: identifierDTO): Promise<JobsInterface> {
// 	try {
// 		const accountRepository = AccountRepository.getInstance()
// 		const data = await accountRepository.adminFindJobsByIdentifier(identifier)
// 		if (data) return data
// 	} catch (error) {
// 		throw new Error(`400 : Save data is not successfully`)
// 	}
// 	throw new Error(`404 : username is not exist in database`)
// }

// async function findProfileJobsAccountByUsername(identifier: identifierDTO): Promise<JobsInterface> {
// 	try {
// 		const accountRepository = AccountRepository.getInstance()
// 		const data = await accountRepository.findJobsByIdentifier(identifier)
// 		if (data) return data
// 	} catch (error) {
// 		throw new Error(`400 : Save data is not successfully`)
// 	}
// 	throw new Error(`404 : username is not exist in database`)
// }

// async function createJobsAccount(jobs_account: createDTO): Promise<string> {
// 	const accountRepository = AccountRepository.getInstance()
// 	let { username, password } = jobs_account
// 	const account = await accountRepository.findJobsByIdentifier({ username })

// 	if (!account) {
// 		if (password) jobs_account.password = await hashing(password)
// 		else throw new Error(`400 : Invalid input, Please input field password`)
// 		try {
// 			const jobs_id = await accountRepository.createJobsAccount(jobs_account)
// 			console.log('Create jobs account success: jobs_id is', jobs_id)
// 			return `201 : Create jobs account is successfully`
// 		} catch (err) {
// 			console.error(err)
// 			throw new Error(`400 : Save data is not successfully`)
// 		}
// 	}
// 	throw new Error(`400 : Account is existing, create account didn't successfully`)
// }

// async function confirmedWithEmail(req: confirmedEmailDTO): Promise<string> {
// 	const accountRepository = AccountRepository.getInstance()
// 	let { identifier, email } = req
// 	const account = await accountRepository.findJobsByIdentifier(identifier)

// 	if (account) {
// 		try {
// 			await accountRepository.updateEmailByIdentifier(identifier, email)
// 			return `200 : Comfirmed, Email is update successfully`
// 		} catch (error) {
// 			console.error(error)
// 			throw new Error(`400 : Save data is not successfully`)
// 		}
// 	}
// 	throw new Error(`404 : your username is not exist in database.`)
// }

// async function updateProfileJobsAccount(req: updateProfileDTO): Promise<string> {
// 	const accountRepository = AccountRepository.getInstance()
// 	const { identifier, profile } = req

// 	try {
// 		await accountRepository.updateProfileJobsAccountByIdentifier(identifier, profile)
// 		return `200 : Updated, Profile is update successfully`
// 	} catch (error) {
// 		console.error(error)
// 		throw new Error(`400 : Update profile is not successfully`)
// 	}
// }

// async function deleteJobsAccount(req: deleteDTO): Promise<string> {
// 	const accountRepository = AccountRepository.getInstance()
// 	let { identifier, password } = req
// 	let hash: string | null

// 	try {
// 		hash = await accountRepository.findPasswordHashedByIdentifier(identifier)
// 	} catch (error) {
// 		console.error(error)
// 		throw new Error(`404 : Invalid input, Your identifier is not exist`)
// 	}

// 	if (hash) {
// 		const match = await compareHashed(password, hash)
// 		if (match) {
// 			const deleteResult: number = await accountRepository.deleteJobsAccount(identifier)
// 			if (deleteResult) return `200 : Delete account is successfully`
// 			throw new Error(`404 : Delete data is not successfully, don't have data in Database`)
// 		}
// 		throw new Error(`400 : Invalid input, Your password is not match`)
// 	}
// 	throw new Error(`404 : Invalid input, Your identifier is not exist`)
// }

// async function deActivateJobsAccount(req: deleteDTO): Promise<string> {
// 	const bias: string = '_deactivete'
// 	const accountRepository = AccountRepository.getInstance()
// 	let { identifier, password } = req
// 	let hash: string | null

// 	try {
// 		hash = await accountRepository.findPasswordHashedByIdentifier(identifier)
// 	} catch (error) {
// 		console.log(error)
// 		throw new Error(`404 : Invalid input, Your identifier is not exist`)
// 	}

// 	if (hash) {
// 		const match = await compareHashed(password, hash)
// 		if (match) {
// 			try {
// 				const shipprt_account = (await accountRepository.findJobsByIdentifier(
// 					identifier,
// 				)) as JobsInterface
// 				const { username } = shipprt_account
// 				const nModified = await accountRepository.deActivateJobsAccount(identifier, username, bias)
// 				if (nModified >= 1) return `200 : DeActivate account is successfully`
// 			} catch (err) {
// 				throw new Error(`400 : DeActivate account is not successfully`)
// 			}
// 			throw new Error(`404 : Some profile information is not exist in database`)
// 		}
// 		throw new Error(`400 : Invalid input, Your password is not match`)
// 	}
// 	throw new Error(`404 : Invalid input, Your identifier is not exist`)
// }

export default {
	// adminFindJobsByIdentifier,
	// updateProfileJobsAccount,
	// findProfileJobsAccountByUsername,
	// createJobsAccount,
	// confirmedWithEmail,
	// deleteJobsAccount,
	// deActivateJobsAccount,
}
