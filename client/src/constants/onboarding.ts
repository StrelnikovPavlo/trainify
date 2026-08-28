export const ACTIVITY_LEVELS = [
	{
		value: 'PASSIVE',
		title: 'Passive',
		description: 'Sedentary lifestyle — little or no physical activity',
	},
	{
		value: 'LIGHTACTIVE',
		title: 'Lightly active',
		description: 'Light exercise 1–2 times/week or walk regularly',
	},
	{
		value: 'MODERATELYACTIVE',
		title: 'Moderately active',
		description: 'Exercise 2–3 times/week with moderate intensity',
	},
	{
		value: 'VERYACTIVE',
		title: 'Very active',
		description: 'Exercise 4–5 times/week, mix of strength & cardio',
	},
	{
		value: 'SUPERACTIVE',
		title: 'Super active',
		description: 'Train 6–7 times/week or have a physically demanding job',
	},
] as const

export const BODY_TYPE = [
	{
		value: 'ECTOMORPH',
		title: 'Ectomorph (skinny)'
	},
	{
		value: 'MESOMORPH',
		title: 'Mesomorph (muscular)'
	},
	{
		value: 'ENDOMORPH',
		title: 'Endomorph (bulky)'
	}
] as const

export const GOAL = [
	{
		value: 'MASS',
		title: 'Build muscles and get stronger'
	},
	{
		value: 'MOBILITY',
		title: 'Develop endurance and flexibility'
	},
	{
		value: 'FAT_LOSS',
		title: 'Burn fat and get stronger'
	}
] as const

export const WORKOUT_TYPE = [
	{
		value: 'GYM',
		title: 'Gym',
		description: 'Bodyweight or minimal equipment training'
	},
	{
		value: 'HOME',
		title: 'Home',
		description: 'Equipment and machines available'
	}
] as const

export const LEVEL = [
	{
		value: 'BEGINNER',
		title: 'Beginner',
		description: '(1+ year of training)'
	},
	{
		value: 'INTERMEDIATE',
		title: 'Intermediate',
		description: '(1-3 years of training)'
	},
	{
		value: 'ADVANCED',
		title: 'Advanced',
		description: '(3+ years of training)'
	}
] as const

export const GENDER = [
	{
		value: 'MALE',
		title: 'Male',
	},
	{
		value: 'FEMALE',
		title: 'Female',
	}
] as const

export type Gender = (typeof GENDER)[number]['value']
export type Level = (typeof LEVEL)[number]['value']
export type BodyType = (typeof BODY_TYPE)[number]['value']
export type ActivityLevel = (typeof ACTIVITY_LEVELS)[number]['value']
