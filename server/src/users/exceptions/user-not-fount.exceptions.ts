import { NotFoundException } from '@nestjs/common'

export class UserNotFoundExceptions extends NotFoundException {
	constructor(identifier: string) {
		super(`User with identifier "${identifier}" not found`)
	}
}
