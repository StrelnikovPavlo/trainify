'use client'

import { Button } from '@/components/ui/Button'
import { workoutService } from '@/services/workout.service'
import { useState } from 'react'

interface CompleteWorkoutButtonProps {
	trainingDayId: string
}

export function CompleteWorkoutButton({
	trainingDayId,
}: CompleteWorkoutButtonProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [isCompleted, setIsCompleted] = useState(false)

	const handleComplete = async () => {
		try {
			setIsLoading(true)

			await workoutService.completeSession(trainingDayId)

			setIsCompleted(true)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Button
			className='btn-black mt-[20px] w-full'
			onClick={handleComplete}
			disabled={isLoading || isCompleted}
		>
			{isCompleted
				? 'Workout completed'
				: isLoading
					? 'Saving...'
					: 'Complete workout'}
		</Button>
	)
}
