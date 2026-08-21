import { IsNotEmpty, IsString } from 'class-validator'

export class ICreateWorkoutSessionDto {
	@IsString()
	@IsNotEmpty()
	trainingDayId: string
}
