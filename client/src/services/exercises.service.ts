import { axiosInstance } from '@/lib/axios'
import { IExercise } from '@/types/exercise.types'

class ExerciseService {
	private BASE_URL = '/exercises'

	async getAll(): Promise<IExercise[]> {
		const { data } = await axiosInstance.get<IExercise[]>(this.BASE_URL)
		return data
	}

	async getById(id: string): Promise<IExercise> {
		const { data } = await axiosInstance.get<IExercise>(
			`${this.BASE_URL}/${id}`,
		)
		return data
	}
}

export const exerciseService = new ExerciseService()
