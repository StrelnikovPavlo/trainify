import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator'

export class CreateExerciseDto {
	@ApiProperty({ example: 'Bench Press', description: 'Exercise name' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	name: string

	@ApiProperty({
		example: 'https://youtube.com/watch?v=abc123',
		description: 'URL of the exercise demonstration video'
	})
	@IsUrl()
	videoUrl: string

	@ApiProperty({
		example: 'cku1234567890',
		description: 'Identifier of the related muscle group'
	})
	@IsString()
	@IsNotEmpty()
	muscleGroupId: string

	@ApiProperty({
		example: 'cku0987654321',
		description: 'Identifier of the related equipment'
	})
	@IsString()
	@IsNotEmpty()
	equipmentId: string
}
