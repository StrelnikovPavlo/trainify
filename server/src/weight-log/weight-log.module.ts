import { Module } from '@nestjs/common'
import { WeightLogController } from './weight-log.controller'
import { WeightLogService } from './weight-log.service'
import { PrismaService } from '@/prisma/prisma.service'
import { WeightLogRepository } from './weight-log.repository'

@Module({
	controllers: [WeightLogController],
	providers: [WeightLogService, PrismaService, WeightLogRepository]
})
export class WeightLogModule {}
