export interface ITrainingExercise {
	id: string
	sets: number
	reps: number
	restSeconds: number
	order: number
	exercise: {
		id: string
		name: string
		videoUrl?: string
	}
}

export interface ITrainingDay {
	id: string
	name: string
	date: string
	isRestDay: boolean
	status?: string
	exercises: ITrainingExercise[]
}

export interface IGeneratedPlan {
	id: string
	name: string
	startDate: string
	durationDays: number
	trainingDays: ITrainingDay[]
}
