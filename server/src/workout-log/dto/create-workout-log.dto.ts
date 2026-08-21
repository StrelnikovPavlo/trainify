import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Min
} from 'class-validator'

export class CreateWorkoutLogDto {
	@IsString()
	@IsNotEmpty()
	sessionId: string

	@IsString()
	@IsNotEmpty()
	exerciseId: string

	@IsNumber()
	@Min(1)
	sets: number

	@IsNumber()
	@Min(1)
	reps: number

	@IsNumber()
	@IsOptional()
	weight?: number

	@IsNumber()
	@Min(0)
	completedSets: number

	@IsNumber()
	@Min(0)
	completedReps: number
}
