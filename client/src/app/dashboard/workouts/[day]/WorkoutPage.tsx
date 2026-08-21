// src/components/workout/details/workout.tsx
'use client'

import { WorkoutActions } from '@/components/workout/details/workout-actions'
import { WorkoutCard } from '@/components/workout/details/workout-card'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useTrainingPlan } from '@/hooks/useTrainingPlan'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export function Workout() {
	const params = useParams()
	const { data, isLoading, isError } = useTrainingPlan()

	const dayNumber = Number(params.day)

	if (isLoading) {
		return <div className='py-[40px] text-gray'>Loading workout...</div>
	}

	if (isError || !data) {
		return <div className='py-[40px]'>Failed to load workout plan</div>
	}

	const trainingDays = data.trainingDays ?? []
	const currentDay = trainingDays[dayNumber - 1]

	if (!currentDay) {
		return <div className='py-[40px]'>Workout not found</div>
	}

	return (
		<div className='mx-auto max-w-[850px] pb-[50px]'>
			<div className='mb-[25px] mt-[30px]'>
				<Link
					href={`${DASHBOARD_PAGES.WORKOUTS}`}
					className='text-[13px] font-bold text-gray transition hover:text-black'
				>
					← Back to workouts
				</Link>

				<h1 className='mt-[15px] font-alumni text-[48px] uppercase leading-none'>
					{currentDay.isRestDay ? 'Rest day' : `${currentDay.name}`}
				</h1>

				<p className='mt-[8px] text-[14px] text-gray'>
					{new Date(currentDay.date).toLocaleDateString('en-US', {
						weekday: 'long',
						month: 'long',
						day: 'numeric',
					})}
				</p>
			</div>

			<WorkoutCard day={currentDay} />

			{!currentDay.isRestDay && (
				<WorkoutActions
					trainingDayId={currentDay.id}
					dayName={currentDay.name}
				/>
			)}
		</div>
	)
}
