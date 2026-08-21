'use client'

import { ITrainingExercise } from '@/types/training-plan.types'
import { useState } from 'react'

interface WorkoutExerciseCardProps {
	exercise: ITrainingExercise
	index: number
	isOpen: boolean
	onOpen: () => void
}

export function WorkoutExerciseCard({
	exercise,
	index,
	isOpen,
	onOpen,
}: WorkoutExerciseCardProps) {
	const [reps, setReps] = useState<string[]>(Array(exercise.sets).fill(''))

	const completedSets = reps.filter(Boolean).length
	const isAllCompleted = completedSets === exercise.sets

	const handleRepsChange = (setIndex: number, value: string) => {
		if (!/^\d*$/.test(value)) return

		setReps(prev => {
			const next = [...prev]
			next[setIndex] = value
			return next
		})
	}

	// Перемикання швидкого заповнення підходу (Quick Complete)
	const toggleSetComplete = (setIndex: number) => {
		setReps(prev => {
			const next = [...prev]
			next[setIndex] = next[setIndex] ? '' : String(exercise.reps)
			return next
		})
	}

	return (
		<div
			className={`overflow-hidden rounded-[24px] border transition-all duration-200 ${
				isOpen
					? 'border-black/10 bg-white shadow-lg shadow-black/5'
					: 'border-black/[0.06] bg-white hover:border-black/20'
			}`}
		>
			{/* Шапка картки */}
			<button
				type='button'
				onClick={onOpen}
				className='flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5'
			>
				<div className='flex items-center gap-3.5 min-w-0'>
					<div
						className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[12px] font-black transition-colors ${
							isOpen
								? 'bg-primary text-black shadow-sm'
								: isAllCompleted
									? 'bg-black text-white'
									: 'bg-gray-100 text-black/50'
						}`}
					>
						{isAllCompleted ? '✓' : String(index + 1).padStart(2, '0')}
					</div>

					<div className='min-w-0'>
						<div className='truncate text-[15px] font-bold sm:text-[16px] text-black'>
							{exercise.exercise.name}
						</div>

						<div className='mt-1 flex flex-wrap items-center gap-2 text-[11px] text-black/50 font-medium'>
							<span>{exercise.sets} sets</span>
							<span>•</span>
							<span>{exercise.reps} reps</span>
							<span>•</span>
							<span className={completedSets > 0 ? 'text-black font-bold' : ''}>
								{completedSets}/{exercise.sets} completed
							</span>
						</div>
					</div>
				</div>

				<div
					className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
						isOpen
							? 'bg-black text-white rotate-180'
							: 'bg-gray-100 text-black/40 hover:bg-black/10'
					}`}
				>
					↓
				</div>
			</button>

			{/* Розгортальний вміст */}
			{isOpen && (
				<div className='border-t border-black/5 bg-[#fafafa] p-4 sm:p-5'>
					{/* Інфо-панель цілей */}
					<div className='mb-4 grid grid-cols-2 gap-3 rounded-2xl bg-white p-3.5 border border-black/[0.06] shadow-sm'>
						<div className='flex items-center gap-2.5'>
							<span className='flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-xs'>
								🎯
							</span>
							<div>
								<div className='text-[9px] font-bold uppercase tracking-wider text-black/40'>
									Target
								</div>
								<div className='text-[13px] font-extrabold text-black'>
									{exercise.sets} × {exercise.reps} reps
								</div>
							</div>
						</div>

						<div className='flex items-center gap-2.5 border-l border-black/5 pl-3'>
							<span className='flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-xs'>
								⏱️
							</span>
							<div>
								<div className='text-[9px] font-bold uppercase tracking-wider text-black/40'>
									Rest
								</div>
								<div className='text-[13px] font-extrabold text-black'>
									{exercise.restSeconds} seconds
								</div>
							</div>
						</div>
					</div>

					{/* Список підходів */}
					<div className='space-y-2.5'>
						{reps.map((value, setIndex) => {
							const completed = Boolean(value)

							return (
								<div
									key={setIndex}
									className={`flex items-center justify-between gap-3 rounded-2xl p-3 transition-all ${
										completed
											? 'bg-primary/15 border border-primary/30'
											: 'bg-white border border-black/[0.06]'
									}`}
								>
									<div className='flex items-center gap-3 min-w-0'>
										<div
											className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold transition-colors ${
												completed
													? 'bg-primary text-black'
													: 'bg-gray-100 text-black/40'
											}`}
										>
											{setIndex + 1}
										</div>

										<div className='min-w-0'>
											<div className='text-[10px] font-bold uppercase tracking-wider text-black/40'>
												Set {setIndex + 1}
											</div>
											<div className='text-[12px] font-medium text-black/70'>
												Goal: {exercise.reps} reps
											</div>
										</div>
									</div>

									{/* Ввід та швидке завершення підходу */}
									<div className='flex items-center gap-2'>
										<div className='flex items-center gap-1.5'>
											<input
												type='text'
												inputMode='numeric'
												value={value}
												onChange={event =>
													handleRepsChange(setIndex, event.target.value)
												}
												placeholder={String(exercise.reps)}
												className={`h-10 w-16 rounded-xl border px-2 text-center text-[14px] font-bold outline-none transition ${
													completed
														? 'border-black/20 bg-white text-black'
														: 'border-black/10 bg-gray-50 text-black placeholder:text-black/20 focus:border-black/30 focus:bg-white'
												}`}
											/>
											<span className='text-[10px] font-bold uppercase text-black/30 hidden sm:inline'>
												reps
											</span>
										</div>

										<button
											type='button'
											onClick={() => toggleSetComplete(setIndex)}
											className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold transition-all active:scale-95 ${
												completed
													? 'bg-primary text-black shadow-sm'
													: 'bg-gray-100 text-black/30 hover:bg-black/10 hover:text-black'
											}`}
											title='Mark set as completed'
										>
											✓
										</button>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}
