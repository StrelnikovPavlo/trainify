'use client'

import { WorkoutsHeader } from '@/components/workout/list/workouts-header'
import { WorkoutsHero } from '@/components/workout/list/workouts-hero'
import { WorkoutsList } from '@/components/workout/list/workouts-list'
import { useWorkouts } from '@/hooks/useWorkouts'

export default function Workouts() {
	const { isLoading, isError, trainingPlan } = useWorkouts()

	if (isLoading) {
		return <div className='py-10 text-gray'>Loading workouts...</div>
	}

	if (isError || !trainingPlan) {
		return (
			<div className='py-10'>
				<div className='text-2xl font-bold'>No training plan</div>

				<div className='mt-1 text-gray'>
					Generate your training plan to get started.
				</div>
			</div>
		)
	}

	return (
		<div className='px-4 pb-12 sm:px-0'>
			<WorkoutsHeader />

			<WorkoutsHero />

			<WorkoutsList />
		</div>
	)
}
