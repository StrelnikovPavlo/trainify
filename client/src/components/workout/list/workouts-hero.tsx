import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { ITrainingDay } from '@/types/training-plan.types'
import Link from 'next/link'

interface IWorkoutsHeroProps {
	trainingDays: ITrainingDay[]
	currentTrainingDay: ITrainingDay | undefined
	trainingDayNumber: number
	trainingProgress: number
	currentDayIndex: number
}

export function WorkoutsHero({
	trainingDays,
	currentTrainingDay,
	trainingDayNumber,
	trainingProgress,
	currentDayIndex,
}: IWorkoutsHeroProps) {
	return (
		<div className='mb-8 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_280px]'>
			<div className='relative overflow-hidden rounded-[26px] bg-black p-5 text-white sm:p-6'>
				<div className='relative z-10'>
					<div className='mb-3 inline-flex rounded-full bg-primary px-2.5 py-1 text-[10px] font-black uppercase text-black sm:text-[11px]'>
						Today
					</div>

					<div className='text-[12px] uppercase tracking-[0.08em] text-gray sm:text-[13px]'>
						{currentTrainingDay?.isRestDay ? 'Recovery' : 'Training day'}
					</div>

					<h2 className='mt-1 font-alumni text-[36px] uppercase leading-none sm:text-[42px]'>
						{currentTrainingDay?.isRestDay
							? 'Rest day'
							: `${currentTrainingDay?.name}`}
					</h2>

					{currentTrainingDay && !currentTrainingDay.isRestDay && (
						<div className='mt-4 flex gap-2'>
							<div className='rounded-xl bg-white/10 px-3 py-2'>
								<div className='text-[10px] text-gray sm:text-[11px]'>
									Exercises
								</div>

								<div className='mt-0.5 font-bold text-sm sm:text-base'>
									{currentTrainingDay.exercises?.length ?? 0}
								</div>
							</div>

							<div className='rounded-xl bg-white/10 px-3 py-2'>
								<div className='text-[10px] text-gray sm:text-[11px]'>Sets</div>

								<div className='mt-0.5 font-bold text-sm sm:text-base'>
									{(currentTrainingDay.exercises ?? []).reduce(
										(totalSets, exercise) => totalSets + (exercise.sets ?? 0),
										0,
									)}
								</div>
							</div>
						</div>
					)}

					{currentTrainingDay && !currentTrainingDay.isRestDay && (
						<Link
							href={`${DASHBOARD_PAGES.WORKOUTS}/${trainingDayNumber}`}
							className='mt-5 inline-flex w-full justify-center rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-black transition hover:scale-[1.02] sm:w-auto sm:justify-start'
						>
							Start workout →
						</Link>
					)}
				</div>

				<div className='absolute -right-12 -top-16 h-48 w-48 rounded-full bg-primary/10 sm:h-56 sm:w-56' />
				<div className='absolute -bottom-20 right-16 h-48 w-48 rounded-full bg-primary/5 sm:h-56 sm:w-56' />
			</div>

			{/* Progress */}
			<div className='rounded-[26px] border border-black/5 bg-white p-5 sm:p-6'>
				<div className='mb-4'>
					<div className='text-[13px] font-bold'>Weekly progress</div>

					<div className='mt-0.5 text-[12px] text-gray'>Keep going</div>
				</div>

				<div className='flex items-end gap-1'>
					<span className='text-[40px] font-bold leading-none sm:text-[46px]'>
						{trainingProgress}
					</span>

					<span className='mb-1 text-[14px] text-gray'>%</span>
				</div>

				<div className='mt-4 h-2 overflow-hidden rounded-full bg-gray-100'>
					<div
						className='h-full rounded-full bg-primary transition-all'
						style={{ width: `${trainingProgress}%` }}
					/>
				</div>

				<div className='mt-3 flex justify-between text-[12px] text-gray'>
					<span>{currentDayIndex >= 0 ? currentDayIndex + 1 : 0} days</span>

					<span>{trainingDays.length} total</span>
				</div>
			</div>
		</div>
	)
}
