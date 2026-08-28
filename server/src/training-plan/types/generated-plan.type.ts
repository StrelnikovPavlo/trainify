export interface GeneratedDay {
	name: string
	dayNumber?: number
	date: string
	isRestDay: boolean
	exercises: {
		exerciseId: string
		order: number
		sets: number
		reps: number
		restSeconds: number
	}[]
}

export interface GeneratedPlan {
	name: string
	startDate: string
	durationDays: number
	days: GeneratedDay[]
}
