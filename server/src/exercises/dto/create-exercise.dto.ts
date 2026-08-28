import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator'
import { WorkoutType } from 'prisma/generated/prisma/enums'

export class CreateExerciseDto {
	@ApiProperty({ example: 'CABLE CHEST FLY' })
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
		example: WorkoutType.GYM,
		enum: WorkoutType,
		description: 'Whether the exercise is intended for gym or home workouts'
	})
	@IsEnum(WorkoutType)
	type: WorkoutType

	@ApiProperty({
		example: 'cmsrv6s1p00033mms0909s42b',
		description: 'Identifier of the related muscle group'
	})
	@IsString()
	@IsNotEmpty()
	muscleGroupId: string

	@ApiProperty({
		example: 'cmsu5qsde000c9jmswjwo45i4',
		description: 'Identifier of the related equipment'
	})
	@IsString()
	@IsNotEmpty()
	equipmentId: string
}
