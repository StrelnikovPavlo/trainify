import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginDto {
	@ApiProperty({ example: 'test@test.com' })
	@IsString()
	email: string

	@ApiProperty({ example: '123456', minLength: 6 })
	@IsString()
	password: string
}
