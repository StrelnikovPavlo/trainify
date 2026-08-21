import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { GeneratedPlan } from './types/generated-plan.type'

@Injectable()
export class TrainingPlanRepository {
	constructor(private readonly prismaServices: PrismaService) {}

	findExercises() {
		return this.prismaServices.exercise.findMany({
			include: { muscleGroup: true, equipment: true }
		})
	}

	create(userId: string, plan: GeneratedPlan) {
		return this.prismaServices.trainingPlan.create({
			data: {
				userId,
				name: plan.name,
				startDate: new Date(plan.startDate),
				durationDays: plan.durationDays,
				trainingDays: {
					create: plan.days.map(day => ({
						name: day.name,
						date: new Date(day.date),
						isRestDay: day.isRestDay,
						exercises: {
							create: day.exercises.map(ex => ({
								exercise: { connect: { id: ex.exerciseId } },
								order: ex.order,
								sets: ex.sets,
								reps: ex.reps,
								restSeconds: ex.restSeconds
							}))
						}
					}))
				}
			}
		})
	}

	findByUserId(userId: string) {
		return this.prismaServices.trainingPlan.findUnique({
			where: { userId },
			include: {
				trainingDays: {
					include: {
						exercises: {
							include: { exercise: true },
							orderBy: { order: 'asc' }
						}
					},
					orderBy: { date: 'asc' }
				}
			}
		})
	}
}
