import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsPositive, Max } from 'class-validator'

export class CreateWeightLogDto {
	@ApiProperty({ example: 81.5, description: 'Current weight in kilograms' })
	@IsNumber({}, { message: 'Weight must be a number' })
	@IsPositive({ message: 'Weight must be positive' })
	@Max(300, { message: 'Weight cannot exceed 300 kg' })
	weight: number
}
