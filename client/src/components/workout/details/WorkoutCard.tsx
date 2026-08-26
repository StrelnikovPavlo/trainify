'use client'

import { useWorkoutSession } from '@/hooks/useWorkoutSession'
import { ITrainingDay, ITrainingExercise } from '@/types/training-plan.types'
import { useState } from 'react'
import { ExerciseItem, SetInput } from './ExerciseItem'
import { FinishWorkoutModal } from './FinishWorkoutModal'
import { WorkoutVideoPlayer } from './WorkoutVideoPlayer'

interface WorkoutCardProps {
	day: ITrainingDay
}

function createInitialSets(exercises: ITrainingExercise[]) {
	return Object.fromEntries(
		exercises.map(exercise => [
			exercise.id,
			Array.from({ length: exercise.sets }, () => ({
				reps: exercise.reps,
				weight: 0,
			})),
		]),
	) as Record<string, SetInput[]>
}

function summarizeSets(sets: SetInput[]) {
	return {
		completedSets: sets.length,
		completedReps: sets.reduce((sum, s) => sum + s.reps, 0),
	}
}

export function WorkoutCard({ day }: WorkoutCardProps) {
	const {
		session,
		startSession,
		isStarting,
		logExercise,
		completeSession,
		isCompleting,
	} = useWorkoutSession(day.id)

	const exercises = day.exercises ?? []
	const hasStarted = !!session && !session.completedAt

	const [openId, setOpenId] = useState<string | null>(null)
	const [setsByExercise, setSetsByExercise] = useState(() =>
		createInitialSets(exercises),
	)
	const [showFinishModal, setShowFinishModal] = useState(false)

	const openExercise = exercises.find(item => item.id === openId)

	const handleStart = async () => {
		await startSession()
		setOpenId(exercises[0]?.id ?? null)
	}

	const handleSetChange = (
		exerciseId: string,
		index: number,
		patch: Partial<SetInput>,
	) => {
		setSetsByExercise(prev => ({
			...prev,
			[exerciseId]: prev[exerciseId].map((set, i) =>
				i === index ? { ...set, ...patch } : set,
			),
		}))
	}

	const handleFinish = async () => {
		if (!session) return

		await Promise.all(
			exercises.map(exercise => {
				const { completedSets, completedReps } = summarizeSets(
					setsByExercise[exercise.id],
				)

				return logExercise({
					sessionId: session.id,
					exerciseId: exercise.exercise.id,
					sets: exercise.sets,
					reps: exercise.reps,
					completedSets,
					completedReps,
				})
			}),
		)

		await completeSession(session.id)
		setShowFinishModal(true)
	}

	if (day.isRestDay) {
		return (
			<div className='rounded-[32px] bg-black p-8 text-center text-white'>
				<h3 className='font-alumni text-3xl font-bold uppercase'>Rest day</h3>
				<p className='mt-2 text-[13px] text-white/40'>
					No exercises today — recover and come back stronger.
				</p>
			</div>
		)
	}

	return (
		<div className='grid gap-6 lg:grid-cols-[1fr_320px]'>
			<div>
				{!hasStarted ? (
					<div className='rounded-[32px] bg-black p-8 text-white'>
						<span className='rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase text-black'>
							Today
						</span>

						<h2 className='mt-4 font-alumni text-[40px] font-bold uppercase leading-none'>
							{day.name}
						</h2>

						<div className='mt-4 flex gap-2'>
							<span className='rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold'>
								{exercises.length} exercises
							</span>
							<span className='rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold'>
								{exercises.reduce((sum, e) => sum + e.sets, 0)} sets
							</span>
						</div>

						<button
							type='button'
							onClick={handleStart}
							disabled={isStarting}
							className='btn btn-yellow mt-6 px-8 py-3.5 text-[12px] font-black uppercase tracking-wide disabled:opacity-50'
						>
							{isStarting ? 'Starting...' : 'Start workout →'}
						</button>
					</div>
				) : (
					<>
						<div className='flex flex-col gap-3'>
							{exercises
								.sort((a, b) => a.order - b.order)
								.map((exercise, index) => (
									<ExerciseItem
										key={exercise.id}
										exercise={exercise}
										orderNumber={index + 1}
										isOpen={openId === exercise.id}
										onToggle={() =>
											setOpenId(prev =>
												prev === exercise.id ? null : exercise.id,
											)
										}
										sets={setsByExercise[exercise.id]}
										onSetChange={(i, patch) =>
											handleSetChange(exercise.id, i, patch)
										}
									/>
								))}
						</div>

						<button
							type='button'
							onClick={handleFinish}
							disabled={isCompleting}
							className='btn btn-black mt-4 w-full py-4 text-[13px] font-black uppercase tracking-wide disabled:opacity-50'
						>
							{isCompleting ? 'Saving...' : 'Finish workout'}
						</button>
					</>
				)}
			</div>

			<WorkoutVideoPlayer
				videoUrl={openExercise?.exercise.videoUrl}
				exerciseName={openExercise?.exercise.name}
			/>

			<FinishWorkoutModal isOpen={showFinishModal} />
		</div>
	)
}
