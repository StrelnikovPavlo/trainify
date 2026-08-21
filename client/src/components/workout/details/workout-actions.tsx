// src/components/workout/details/workout-actions.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { useWorkoutSession } from '@/hooks/useWorkoutSession'
import { useState } from 'react'
import { WorkoutSuccessModal } from './workout-success-modal'

interface WorkoutActionsProps {
	trainingDayId: string
	dayName: string
}

export function WorkoutActions({
	trainingDayId,
	dayName,
}: WorkoutActionsProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const {
		session,
		isLoading,
		startSession,
		isStarting,
		completeSession,
		isCompleting,
	} = useWorkoutSession(trainingDayId)

	const handleFinish = async () => {
		if (!session) return
		await completeSession(session.id)
		setIsModalOpen(true) // Відкриваємо вітальне вікно після збереження
	}

	if (isLoading) {
		return (
			<Button className='btn-black mt-[20px] w-full' disabled>
				Loading...
			</Button>
		)
	}

	// 1. Почати тренування
	if (!session) {
		return (
			<Button
				className='btn-black mt-[20px] w-full'
				onClick={() => startSession()}
				disabled={isStarting}
			>
				{isStarting ? 'Starting...' : 'Start Workout'}
			</Button>
		)
	}

	// 2. Тренування в процесі (активне)
	if (!session.completedAt) {
		return (
			<>
				<Button
					className='btn-black mt-[20px] w-full'
					onClick={handleFinish}
					disabled={isCompleting}
				>
					{isCompleting ? 'Completing...' : 'Finish Workout'}
				</Button>

				<WorkoutSuccessModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					dayName={dayName}
				/>
			</>
		)
	}

	// 3. Якщо тренування вже було завершене раніше (Блок успіху замість простої кнопки)
	return (
		<div className='mt-[20px] rounded-xl border border-green-200 bg-green-50 p-4 text-center'>
			<div className='flex items-center justify-center gap-2 text-green-700 font-bold text-[15px]'>
				<span>✓</span> Workout Completed
			</div>
			<p className='mt-1 text-[13px] text-green-600'>
				You finished this session on{' '}
				{new Date(session.completedAt).toLocaleDateString('en-US', {
					hour: '2-digit',
					minute: '2-digit',
				})}
			</p>
		</div>
	)
}
