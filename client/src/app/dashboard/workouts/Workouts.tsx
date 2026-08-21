'use client'

import { WorkoutsHeader } from '@/components/workout/list/workouts-header'
import { WorkoutsHero } from '@/components/workout/list/workouts-hero'
import { WorkoutsList } from '@/components/workout/list/workouts-list'
import { useWorkouts } from '@/hooks/useWorkouts'

export default function Workouts() {
	const {
		trainingDays,
		isLoading,
		isError,
		trainingPlan,
		currentTrainingDay,
		currentDayIndex,
		trainingDayNumber,
		completedTrainingDays,
		currentDateString,
		trainingProgress,
		formattedCurrentDate,
	} = useWorkouts()

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
			<WorkoutsHeader
				data={trainingPlan}
				formattedDate={formattedCurrentDate}
			/>

			<WorkoutsHero
				trainingDays={trainingDays}
				currentTrainingDay={currentTrainingDay}
				trainingDayNumber={trainingDayNumber}
				trainingProgress={trainingProgress}
				currentDayIndex={currentDayIndex}
			/>

			<WorkoutsList
				trainingDays={trainingDays}
				currentDateString={currentDateString}
				completedTrainingDays={completedTrainingDays}
			/>
		</div>
	)
}
