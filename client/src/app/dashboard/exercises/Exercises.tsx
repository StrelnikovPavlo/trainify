'use client'

import { ExerciseCard } from '@/components/exercises/ExerciseCard'
import { useExercises } from '@/hooks/useExercises'

export default function ExercisesPage() {
	const { exercises, isLoading, isError } = useExercises()

	return (
		<div className='py-6'>
			<h1 className='mb-6 font-alumni text-[32px] font-bold tracking-[-0.03em] text-[#231f1f]'>
				Exercises<span className='text-primary'>.</span>
			</h1>

			{isLoading && (
				<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{Array.from({ length: 8 }).map((_, i) => (
						<div
							key={i}
							className='aspect-[3/4] animate-pulse rounded-2xl bg-black/5'
						/>
					))}
				</div>
			)}

			{isError && (
				<p className='text-sm text-red-500'>
					Failed to load exercises. Please try again later.
				</p>
			)}

			{!isLoading && !isError && exercises.length === 0 && (
				<p className='text-sm text-black/40'>No exercises yet.</p>
			)}

			{!isLoading && !isError && exercises.length > 0 && (
				<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{exercises.map(exercise => (
						<ExerciseCard key={exercise.id} exercise={exercise} />
					))}
				</div>
			)}
		</div>
	)
}
