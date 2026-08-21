'use client'

import { ITrainingDay } from '@/types/training-plan.types'
import { useState } from 'react'
import { WorkoutExerciseCard } from './workout-exercise-card'
import { WorkoutRest } from './workout-rest'

interface WorkoutCardProps {
	day: ITrainingDay
}

export function WorkoutCard({ day }: WorkoutCardProps) {
	const [activeExercise, setActiveExercise] = useState(
		day.exercises?.[0]?.id ?? null,
	)

	if (day.isRestDay) {
		return <WorkoutRest />
	}

	const exercises = [...day.exercises].sort((a, b) => a.order - b.order)
	const active = exercises.find(exercise => exercise.id === activeExercise)

	return (
		<div className='grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]'>
			<div className='order-1 lg:order-2 lg:sticky lg:top-5 lg:h-fit'>
				<div className='overflow-hidden rounded-[28px] bg-[#18181b] shadow-xl shadow-black/10'>
					<div className='aspect-video bg-black relative'>
						{active?.exercise.videoUrl ? (
							<iframe
								key={active.id}
								src={active.exercise.videoUrl}
								title={active.exercise.name}
								className='h-full w-full border-none'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
							/>
						) : (
							<div className='flex h-full flex-col items-center justify-center gap-2 text-white/40'>
								<span className='text-2xl'>📹</span>
								<span className='text-[12px] font-medium'>
									Video preview unavailable
								</span>
							</div>
						)}
					</div>

					<div className='p-5 text-white'>
						<div className='flex items-center justify-between'>
							<span className='text-[10px] font-extrabold uppercase tracking-widest text-primary'>
								Now Viewing
							</span>
							<span className='text-[11px] font-bold text-white/40'>
								Exercise #{exercises.findIndex(e => e.id === active?.id) + 1}
							</span>
						</div>

						<h3 className='mt-1 text-[20px] font-bold text-white truncate'>
							{active?.exercise.name ?? 'Select an exercise'}
						</h3>

						<div className='mt-3 flex flex-wrap items-center gap-2'>
							<div className='rounded-xl bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80'>
								{active?.sets} sets
							</div>

							<div className='rounded-xl bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80'>
								{active?.reps} reps
							</div>

							<div className='rounded-xl bg-primary px-3 py-1.5 text-[11px] font-bold text-black'>
								⏱️ {active?.restSeconds}s rest
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='order-2 lg:order-1 min-w-0 space-y-3'>
				<div className='mb-2 flex items-center justify-between px-1'>
					<h3 className='text-[18px] font-bold text-black'>Exercises</h3>
					<span className='text-[12px] font-bold text-black/40'>
						{exercises.length} total
					</span>
				</div>

				{exercises.map((exercise, index) => (
					<WorkoutExerciseCard
						key={exercise.id}
						exercise={exercise}
						index={index}
						isOpen={activeExercise === exercise.id}
						onOpen={() => setActiveExercise(exercise.id)}
					/>
				))}
			</div>
		</div>
	)
}
