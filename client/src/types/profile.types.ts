export type Gender = 'MALE' | 'FEMALE'
export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
export type Goal = 'MASS' | 'MOBILITY' | 'FAT_LOSS'
export type Activity = 'PASSIVE' | 'LIGHTACTIVE' | 'MODERATELYACTIVE' | 'VERYACTIVE' | 'SUPERACTIVE'
export type WorkoutType = 'GYM' | 'HOME'
export type BodyType = 'ECTOMORPH' | 'MESOMORPH' | 'ENDOMORPH'

export interface IProfileForm {
	age: number
	weight: number
	height: number
	targetWeight: number
	gender: Gender
	level: Level
	goal: Goal
	activity: Activity
	workoutType: WorkoutType
	bodyType: BodyType
}
