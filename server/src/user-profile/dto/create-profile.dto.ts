import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator'
import {
	Activity,
	BodyType,
	Gender,
	Goal,
	Level,
	WorkoutType
} from 'prisma/generated/prisma/enums'

export class UserProfileDto {
	@ApiProperty({
		example: 25,
		description: 'The age of the user',
		minimum: 8,
		maximum: 116
	})
	@IsNotEmpty()
	@IsInt({ message: 'Age must be an integer number' })
	@Min(16, { message: 'Age must be at least 8' })
	@Max(80, { message: 'Age cannot be greater than 116' })
	age: number

	@ApiProperty({
		example: 75.5,
		description: 'Current weight of the user in kilograms',
		minimum: 30,
		maximum: 300
	})
	@IsNotEmpty()
	@IsNumber({}, { message: 'Weight must be a number' })
	@Min(40, { message: 'Weight must be at least 30 kg' })
	@Max(140, { message: 'Weight cannot exceed 300 kg' })
	weight: number

	@ApiProperty({
		example: 180,
		description: 'Height of the user in centimeters',
		minimum: 100,
		maximum: 250
	})
	@IsNotEmpty()
	@IsNumber({}, { message: 'Height must be a number' })
	@Min(40, { message: 'Height must be at least 40 cm' })
	@Max(250, { message: 'Height cannot exceed 250 cm' })
	height: number

	@ApiProperty({
		example: 70,
		description: 'Desired target weight in kilograms',
		minimum: 30,
		maximum: 300
	})
	@IsNotEmpty()
	@IsNumber({}, { message: 'Target weight must be a number' })
	@Min(40, { message: 'Target weight must be at least 30 kg' })
	@Max(140, { message: 'Target weight cannot exceed 300 kg' })
	targetWeight: number

	@ApiProperty({
		enum: Gender,
		example: Gender.MALE,
		description: 'Gender of the user'
	})
	@IsNotEmpty()
	@IsEnum(Gender, { message: 'Invalid gender value' })
	gender: Gender

	@ApiProperty({
		enum: Level,
		example: Level.BEGINNER,
		description: 'Fitness level of the user'
	})
	@IsNotEmpty()
	@IsEnum(Level, { message: 'Invalid fitness level value' })
	level: Level

	@ApiProperty({
		enum: Goal,
		example: Goal.FAT_LOSS,
		description: 'Main fitness goal'
	})
	@IsNotEmpty()
	@IsEnum(Goal, { message: 'Invalid goal value' })
	goal: Goal

	@ApiProperty({
		enum: Activity,
		example: Activity.PASSIVE,
		description: 'Daily activity level'
	})
	@IsNotEmpty()
	@IsEnum(Activity, { message: 'Invalid activity level value' })
	activity: Activity

	@ApiProperty({
		enum: WorkoutType,
		example: WorkoutType.GYM,
		description: 'Preferred type of workout'
	})
	@IsNotEmpty()
	@IsEnum(WorkoutType, { message: 'Invalid workout type value' })
	workoutType: WorkoutType

	@ApiProperty({
		enum: BodyType,
		example: BodyType.ECTOMORPH,
		description: 'Body type classification'
	})
	@IsNotEmpty()
	@IsEnum(BodyType, { message: 'Invalid body type value' })
	bodyType: BodyType
}
