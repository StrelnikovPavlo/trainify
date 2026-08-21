// src/services/workout.service.ts
import { axiosInstance } from '@/lib/axios'

export interface CreateWorkoutLogDto {
	sessionId: string
	exerciseId: string
	sets: number
	reps: number
	weight?: number
	completedSets: number
	completedReps: number
}

export interface WorkoutSession {
	id: string
	userId: string
	trainingDayId: string
	startedAt: string
	completedAt: string | null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	logs: any[]
}

class WorkoutService {
	private SESSION_URL = '/workout-session'
	private LOG_URL = '/workout-log'

	async startSession(trainingDayId: string): Promise<WorkoutSession> {
		const { data } = await axiosInstance.post(this.SESSION_URL, {
			trainingDayId,
		})
		return data
	}

	async getSessionByTrainingDay(
		trainingDayId: string,
	): Promise<WorkoutSession | null> {
		try {
			const { data } = await axiosInstance.get(
				`${this.SESSION_URL}/training-day/${trainingDayId}`,
			)
			return data
		} catch {
			return null
		}
	}

	async logExercise(dto: CreateWorkoutLogDto) {
		const { data } = await axiosInstance.post(this.LOG_URL, dto)
		return data
	}

	async completeSession(sessionId: string): Promise<WorkoutSession> {
		const { data } = await axiosInstance.put(
			`${this.SESSION_URL}/${sessionId}`,
		)
		return data
	}
}

export const workoutService = new WorkoutService()
