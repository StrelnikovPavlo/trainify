export interface IExercise {
	id: string
	name: string
	videoUrl: string
	type: 'GYM' | 'HOME'
	muscleGroup: { id: string; name: string }
	equipment: { id: string; name: string }
}
