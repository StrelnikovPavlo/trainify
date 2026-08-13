import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ExercisesRepository {
	constructor(private readonly prismaServices: PrismaService) {}
}
