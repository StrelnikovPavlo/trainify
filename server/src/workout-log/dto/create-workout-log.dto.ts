import { ApiProperty } from '@nestjs/swagger'
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Min
} from 'class-validator'

export class CreateWorkoutLogDto {
	@ApiProperty({
		example: 'cku1122334455'
	})
	@IsString()
	@IsNotEmpty()
	sessionId: string

	@ApiProperty({
		example: 'cku6677889900'
	})
	@IsString()
	@IsNotEmpty()
	exerciseId: string

	@ApiProperty({
		example: 3,
		description: 'Planned number of sets for this exercise',
		minimum: 1
	})
	@IsNumber()
	@Min(1)
	sets: number

	@ApiProperty({
		example: 12,
		description: 'Planned number of reps per set',
		minimum: 1
	})
	@IsNumber()
	@Min(1)
	reps: number

	@IsNumber()
	@IsOptional()
	weight?: number

	@ApiProperty({
		example: 3,
		description: 'Number of sets actually completed by the user',
		minimum: 0
	})
	@IsNumber()
	@Min(0)
	completedSets: number

	@ApiProperty({
		example: 10,
		description: 'Number of reps actually completed by the user',
		minimum: 0
	})
	@IsNumber()
	@Min(0)
	completedReps: number
}
