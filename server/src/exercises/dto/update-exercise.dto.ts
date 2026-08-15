import { ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { CreateExerciseDto } from './create-exercise.dto'

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
	@ApiPropertyOptional({ example: 'Bench Press', description: 'Exercise name' })
	name?: string

	@ApiPropertyOptional({
		example: 'https://youtube.com/watch?v=abc123',
		description: 'URL of the exercise demonstration video'
	})
	videoUrl?: string

	@ApiPropertyOptional({
		example: 'cku1234567890',
		description: 'Identifier of the related muscle group'
	})
	muscleGroupId?: string

	@ApiPropertyOptional({
		example: 'cku0987654321',
		description: 'Identifier of the related equipment'
	})
	equipmentId?: string
}
