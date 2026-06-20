import { Transform } from 'class-transformer'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength
} from 'class-validator'

export class CreateUserDto {
	@IsString()
	@MinLength(2)
	@IsNotEmpty()
	@Transform(
		({ value }) => (typeof value === 'string' ? value.trim() : value) as string
	)
	username: string

	@IsString()
	@MinLength(2)
	@IsNotEmpty()
	@Transform(
		({ value }) => (typeof value === 'string' ? value.trim() : value) as string
	)
	surname: string

	@IsEmail()
	@IsNotEmpty()
	@Transform(
		({ value }) =>
			(typeof value === 'string' ? value.trim().toLowerCase() : value) as string
	)
	email: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(16)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			'Password is too weak. It must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character.'
	})
	password: string
}
