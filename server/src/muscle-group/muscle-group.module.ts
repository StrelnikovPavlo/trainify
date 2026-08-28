import { Module } from '@nestjs/common'
import { MuscleGroupController } from './muscle-group.controller'
import { MuscleGroupRepository } from './muscle-group.repository'
import { MuscleGroupService } from './muscle-group.service'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
	controllers: [MuscleGroupController],
	providers: [MuscleGroupService, PrismaService, MuscleGroupRepository]
})
export class MuscleGroupModule {}
