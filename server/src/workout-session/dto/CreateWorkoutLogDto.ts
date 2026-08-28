import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ICreateWorkoutSessionDto {
	@ApiProperty({
		example: 'cku1122334455',
		description: 'ID of the training day to start a session for'
	})
	@IsString()
	@IsNotEmpty()
	trainingDayId: string
}
