import { ApiProperty } from '@nestjs/swagger'
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
	@ApiProperty({
		example: 'John',
		description: 'The first name of the user',
		minLength: 2
	})
	@IsString()
	@MinLength(2)
	@IsNotEmpty()
	@Transform(
		({ value }) => (typeof value === 'string' ? value.trim() : value) as string
	)
	username: string

	@ApiProperty({
		example: 'Doe',
		description: 'The last name of the user',
		minLength: 2
	})
	@IsString()
	@MinLength(2)
	@IsNotEmpty()
	@Transform(
		({ value }) => (typeof value === 'string' ? value.trim() : value) as string
	)
	surname: string

	@ApiProperty({
		example: 'john.doe@example.com',
		description: 'Unique email address'
	})
	@IsEmail()
	@IsNotEmpty()
	@Transform(
		({ value }) =>
			(typeof value === 'string' ? value.trim().toLowerCase() : value) as string
	)
	email: string

	@ApiProperty({
		example: 'StrongPass123!',
		description:
			'User password (min 8, max 16 chars, 1 uppercase, 1 lowercase, 1 number/special)',
		minLength: 8,
		maxLength: 16
	})
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
