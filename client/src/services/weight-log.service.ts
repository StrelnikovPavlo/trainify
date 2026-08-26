import { axiosInstance } from '@/lib/axios'
import { IWeightLog } from '@/types/profile.types'

export const weightLogService = {
	log: (weight: number) =>
		axiosInstance
			.post<IWeightLog>('/weight-log', { weight })
			.then(res => res.data),

	getLatest: () =>
		axiosInstance
			.get<IWeightLog | null>('/weight-log/latest')
			.then(res => res.data),

	getHistory: () =>
		axiosInstance.get<IWeightLog[]>('/weight-log').then(res => res.data),
}
