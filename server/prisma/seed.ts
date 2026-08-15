import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { PrismaClient } from './generated/prisma/client'

interface ExerciseSeed {
	name: string
	videoUrl: string
	muscleGroup: string
	equipment: string
}

const configService = new ConfigService()

const connectionString = configService.get<string>('DATABASE_URL')

if (!connectionString)
	throw new Error('DATABASE_URL is not defined in environment variables')

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
	const filePath = join(__dirname, 'seeds', 'exercises.json')

	const file = await readFile(filePath, 'utf-8')

	const exercises: ExerciseSeed[] = JSON.parse(file) as ExerciseSeed[]

	for (const exercise of exercises) {
		const muscleGroup = await prisma.muscleGroup.upsert({
			where: {
				name: exercise.muscleGroup
			},
			update: {},
			create: {
				name: exercise.muscleGroup
			}
		})

		const equipment = await prisma.equipment.upsert({
			where: {
				name: exercise.equipment
			},
			update: {},
			create: {
				name: exercise.equipment
			}
		})

		await prisma.exercise.upsert({
			where: {
				name: exercise.name
			},
			update: {
				videoUrl: exercise.videoUrl,
				muscleGroupId: muscleGroup.id,
				equipmentId: equipment.id
			},
			create: {
				name: exercise.name,
				videoUrl: exercise.videoUrl,
				muscleGroupId: muscleGroup.id,
				equipmentId: equipment.id
			}
		})
	}

	console.log(`Seeded ${exercises.length} exercises`)
}

main()
	.catch(error => {
		console.error(error)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
