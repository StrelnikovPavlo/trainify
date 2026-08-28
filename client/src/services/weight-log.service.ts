import { axiosInstance } from '@/lib/axios'
import { IWeightLog } from '@/types/profile.types'

class WeightLogService {
	private BASE_URL = '/weight-log'

	async log(weight: number): Promise<IWeightLog> {
		const response = await axiosInstance.post<IWeightLog>(this.BASE_URL, {
			weight,
		})
		return response.data
	}

	async getLatest(): Promise<IWeightLog | null> {
		const response = await axiosInstance.get<IWeightLog | null>(
			`${this.BASE_URL}/latest`,
		)
		return response.data
	}

	async getHistory(): Promise<IWeightLog[]> {
		const response = await axiosInstance.get<IWeightLog[]>(this.BASE_URL)
		return response.data
	}
}

export const weightLogService = new WeightLogService()
