import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WeightLogRepository {
	constructor(private readonly prismaService: PrismaService) {}

	create(userId: string, weight: number) {
		return this.prismaService.weightLog.create({
			data: { userId, weight }
		})
	}

	findLatestByUserId(userId: string) {
		return this.prismaService.weightLog.findFirst({
			where: { userId },
			orderBy: { loggedAt: 'desc' }
		})
	}

	findHistoryByUserId(userId: string, limit = 30) {
		return this.prismaService.weightLog.findMany({
			where: { userId },
			orderBy: { loggedAt: 'desc' },
			take: limit
		})
	}
}
