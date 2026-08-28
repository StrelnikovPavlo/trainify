import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginDto {
	@ApiProperty({ example: 'john.doe@example.com' })
	@IsString()
	email: string

	@ApiProperty({ example: 'StrongPass123!', minLength: 6 })
	@IsString()
	password: string
}
