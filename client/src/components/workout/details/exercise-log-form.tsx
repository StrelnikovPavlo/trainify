'use client'

import { Button } from '@/components/ui/Button'
import { useWorkoutSession } from '@/hooks/useWorkoutSession'
import { useState } from 'react'

interface ExerciseLogFormProps {
	trainingDayId: string
	exerciseId: string
	targetSets: number
	targetReps: number
}

export function ExerciseLogForm({
	trainingDayId,
	exerciseId,
	targetSets,
	targetReps,
}: ExerciseLogFormProps) {
	const { session, logExercise, isLogging } = useWorkoutSession(trainingDayId)

	const [completedSets, setCompletedSets] = useState(targetSets)
	const [completedReps, setCompletedReps] = useState(targetReps)
	const [weight, setWeight] = useState<number | undefined>()
	const [isLogged, setIsLogged] = useState(false)

	// Форма показується лише якщо є активна сесія
	if (!session || session.completedAt) return null

	const handleSave = async () => {
		await logExercise({
			sessionId: session.id,
			exerciseId,
			sets: targetSets,
			reps: targetReps,
			weight: weight ? Number(weight) : undefined,
			completedSets: Number(completedSets),
			completedReps: Number(completedReps),
		})
		setIsLogged(true)
	}

	return (
		<div className='mt-3 flex items-center gap-3 rounded bg-gray-100 p-3'>
			<div className='flex items-center gap-2'>
				<label className='text-xs text-gray-600'>Sets:</label>
				<input
					type='number'
					value={completedSets}
					onChange={e => setCompletedSets(Number(e.target.value))}
					className='w-16 rounded border p-1 text-sm'
				/>
			</div>

			<div className='flex items-center gap-2'>
				<label className='text-xs text-gray-600'>Reps:</label>
				<input
					type='number'
					value={completedReps}
					onChange={e => setCompletedReps(Number(e.target.value))}
					className='w-16 rounded border p-1 text-sm'
				/>
			</div>

			<div className='flex items-center gap-2'>
				<label className='text-xs text-gray-600'>Weight (kg):</label>
				<input
					type='number'
					placeholder='0'
					value={weight ?? ''}
					onChange={e => setWeight(Number(e.target.value))}
					className='w-16 rounded border p-1 text-sm'
				/>
			</div>

			<Button
				onClick={handleSave}
				disabled={isLogging || isLogged}
				className='ml-auto text-xs'
			>
				{isLogged ? 'Saved ✓' : isLogging ? 'Saving...' : 'Save Set'}
			</Button>
		</div>
	)
}
