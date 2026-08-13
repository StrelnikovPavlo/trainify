import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateEquipmentDto {
	@ApiProperty({ example: 'Barbell', description: 'Equipment name' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	name: string
}
