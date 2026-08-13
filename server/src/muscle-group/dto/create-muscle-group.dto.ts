import { IsString } from 'class-validator'

export class CreateMuscleGroupDto {
	@IsString()
	name: string
}
