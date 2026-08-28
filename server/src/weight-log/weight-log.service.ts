import { Injectable } from '@nestjs/common'
import { WeightLogRepository } from './weight-log.repository'

@Injectable()
export class WeightLogService {
	constructor(private readonly weightLogRepository: WeightLogRepository) {}

	log(userId: string, weight: number) {
		return this.weightLogRepository.create(userId, weight)
	}

	getLatest(userId: string) {
		return this.weightLogRepository.findLatestByUserId(userId)
	}

	getHistory(userId: string) {
		return this.weightLogRepository.findHistoryByUserId(userId)
	}
}
