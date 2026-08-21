'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { ITrainingDay } from '@/types/training-plan.types'
import Link from 'next/link'
import { WorkoutHero } from './workout-hero'
import { RestDay } from './rest-day'

interface IDashboardMainProps {
	days: ITrainingDay[]
	todayWorkout?: ITrainingDay | null
	todayIndex: number
	todayDate: string
}

export function DashboardMain({
	days,
	todayWorkout,
	todayIndex,
	todayDate,
}: IDashboardMainProps) {
	return (
		<main className='min-w-0 space-y-[20px] sm:space-y-6'>
			<section className='relative overflow-hidden rounded-[28px] bg-[#18181b] p-6 text-white shadow-xl shadow-black/5 sm:p-8'>
				<div className='relative z-10'>
					<div className='flex items-center justify-between'>
						<div className='rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black sm:text-[11px]'>
							Today
						</div>
						<span className='text-[11px] font-bold uppercase tracking-wider text-white/40 sm:text-[12px]'>
							Day {todayIndex >= 0 ? todayIndex + 1 : 1}
						</span>
					</div>

					{todayWorkout?.isRestDay ? (
						<RestDay />
					) : todayWorkout ? (
						<WorkoutHero
							day={todayWorkout}
							dayIndex={todayIndex >= 0 ? todayIndex : 0}
						/>
					) : (
						<div className='py-8 text-white/40'>No workouts for today</div>
					)}
				</div>
				<div className='absolute -right-20 -top-24 h-80 w-80 rounded-full border-[50px] border-white/[0.03]' />
				<div className='absolute -bottom-28 -right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl' />
			</section>

			<section className='rounded-[26px] border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6'>
				<div className='mb-5'>
					<p className='text-[10px] font-bold uppercase tracking-[0.12em] text-black/40'>
						Your schedule
					</p>

					<h2 className='mt-1 font-alumni text-[30px] font-bold uppercase leading-none text-black sm:text-[34px]'>
						This week
					</h2>
				</div>

				<div className='no-scrollbar -mx-2 overflow-x-auto px-2 pb-1'>
					<div className='grid min-w-[300px] grid-cols-7 gap-1.5 sm:gap-2'>
						{days.map((day, index) => {
							const date = new Date(day.date)
							const isToday = day.date?.split('T')[0] === todayDate

							return (
								<Link
									key={day.id ?? day.date ?? index}
									href={`${DASHBOARD_PAGES.WORKOUTS}/${index + 1}`}
									className='group block'
								>
									<div
										className={`flex flex-col items-center justify-between rounded-[18px] p-2 py-3 text-center transition-all duration-200 ${
											isToday
												? 'bg-primary text-black shadow-md shadow-primary/20 scale-[1.03]'
												: 'bg-gray-50 text-black border border-black/[0.04] hover:bg-black/5'
										}`}
									>
										<div
											className={`text-[9px] font-extrabold uppercase tracking-wider ${
												isToday ? 'text-black/60' : 'text-black/40'
											}`}
										>
											{date.toLocaleDateString('en-US', {
												weekday: 'short',
											})}
										</div>

										<div className='my-1.5 text-[18px] font-extrabold sm:text-[20px]'>
											{date.getDate()}
										</div>

										<div
											className={`h-1.5 w-1.5 rounded-full ${
												day.isRestDay
													? isToday
														? 'bg-black/20'
														: 'bg-black/10'
													: isToday
														? 'bg-black'
														: 'bg-primary'
											}`}
										/>
									</div>
								</Link>
							)
						})}
					</div>
				</div>
			</section>

			{todayWorkout && !todayWorkout.isRestDay && (
				<section className='rounded-[26px] border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6'>
					<div className='mb-5 flex items-end justify-between'>
						<div>
							<p className='text-[10px] font-bold uppercase tracking-[0.12em] text-black/40'>
								Today
							</p>

							<h2 className='mt-1 font-alumni text-[30px] font-bold uppercase leading-none text-black sm:text-[34px]'>
								Exercises
							</h2>
						</div>

						<Link
							href={`${DASHBOARD_PAGES.WORKOUTS}/${(todayIndex >= 0 ? todayIndex : 0) + 1}`}
							className='text-[11px] font-extrabold uppercase tracking-wider text-black/40 transition hover:text-black'
						>
							Open workout →
						</Link>
					</div>

					<div className='space-y-2.5'>
						{(todayWorkout.exercises ?? []).map((exercise, index) => (
							<div
								key={exercise.id ?? index}
								className='flex items-center justify-between rounded-[20px] border border-black/[0.04] bg-gray-50 p-3.5 transition-colors hover:bg-gray-100/80'
							>
								<div className='flex items-center gap-3.5 min-w-0 pr-2'>
									<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[12px] font-black text-black shadow-sm'>
										{String(index + 1).padStart(2, '0')}
									</div>

									<div className='min-w-0'>
										<div className='truncate text-[14px] font-bold text-black sm:text-[15px]'>
											{exercise.exercise?.name ?? `Exercise ${index + 1}`}
										</div>

										<div className='mt-0.5 text-[10px] font-medium text-black/40'>
											⏱️ {exercise.restSeconds}s rest
										</div>
									</div>
								</div>

								<div className='shrink-0 text-right'>
									<div className='text-[14px] font-extrabold text-black sm:text-[15px]'>
										{exercise.sets} × {exercise.reps}
									</div>

									<div className='text-[9px] font-bold uppercase tracking-wider text-black/30'>
										sets × reps
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			)}
		</main>
	)
}
