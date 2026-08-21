import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { ITrainingDay } from '@/types/training-plan.types'
import Link from 'next/link'

interface WorkoutsListItemProps {
	trainingDay: ITrainingDay
	dayNumber: number
	isToday: boolean
}

export function WorkoutsListItem({
	trainingDay,
	dayNumber,
	isToday,
}: WorkoutsListItemProps) {
	const exerciseCount = trainingDay.exercises?.length ?? 0

	const totalSets =
		trainingDay.exercises?.reduce(
			(total, exercise) => total + (exercise.sets ?? 0),
			0,
		) ?? 0

	const formattedDate = trainingDay.date
		? new Date(trainingDay.date).toLocaleDateString('en-US', {
				weekday: 'short',
				day: 'numeric',
			})
		: `Day ${dayNumber}`

	const formattedDayNumber = String(dayNumber).padStart(2, '0')

	const metricClass = isToday
		? 'bg-black/10 text-black'
		: 'bg-[#f4f4f5] text-black/80'

	return (
		<Link
			href={`${DASHBOARD_PAGES.WORKOUTS}/${dayNumber}`}
			className='group shrink-0 snap-start focus:outline-none'
		>
			<div
				className={`
					relative flex h-[205px] w-[200px] flex-col justify-between
					rounded-[24px] p-4 transition-all duration-300
					sm:h-[220px] sm:w-[230px] sm:p-5
					${
						isToday
							? 'bg-primary text-black shadow-lg shadow-primary/25 hover:scale-[1.02]'
							: trainingDay.isRestDay
								? 'border border-black/[0.06] bg-[#f8f9fa] text-black/80 hover:bg-white hover:shadow-md'
								: 'border border-black/[0.08] bg-white text-black hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5'
					}
				`}
			>
				{/* Header */}
				<div className='flex items-center justify-between'>
					<span
						className={`
							text-[10px] font-extrabold uppercase tracking-widest
							${isToday ? 'text-black/60' : 'text-black/40'}
						`}
					>
						{formattedDate}
					</span>

					{isToday ? (
						<span className='rounded-full bg-black px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-sm'>
							Today
						</span>
					) : (
						<span
							className={`
								text-[11px] font-bold
								${trainingDay.isRestDay ? 'text-black/30' : 'text-black/40'}
							`}
						>
							#{formattedDayNumber}
						</span>
					)}
				</div>

				{/* Content */}
				<div className='my-auto space-y-2'>
					{trainingDay.isRestDay ? (
						<div>
							<div className='inline-flex items-center gap-1.5 rounded-full bg-black/[0.05] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black/60'>
								Recovery
							</div>

							<h4 className='mt-1.5 font-alumni text-[28px] font-bold uppercase leading-none tracking-tight text-black/70 sm:text-[32px]'>
								Rest Day
							</h4>

							<p className='mt-1 line-clamp-1 text-[11px] text-black/40'>
								Recharge & recover
							</p>
						</div>
					) : (
						<div>
							<h4
								className={`
					font-alumni text-[30px] font-bold uppercase leading-[0.9]
					tracking-tight sm:text-[34px]
					${isToday ? 'text-black' : 'text-[#18181b]'}
				`}
							>
								{trainingDay.name}
							</h4>

							<div className='mt-2.5 flex items-center gap-1.5 sm:gap-2'>
								<div
									className={`flex items-center gap-1 rounded-xl px-2 py-1 text-[10px] font-bold sm:px-2.5 sm:py-1.5 sm:text-[11px] ${metricClass}`}
								>
									<span>{exerciseCount} ex</span>
								</div>

								<div
									className={`flex items-center gap-1 rounded-xl px-2 py-1 text-[10px] font-bold sm:px-2.5 sm:py-1.5 sm:text-[11px] ${metricClass}`}
								>
									<span>{totalSets} sets</span>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div
					className={`
						flex items-center justify-between border-t pt-2.5
						transition-colors sm:pt-3
						${
							isToday
								? 'border-black/10 text-black'
								: 'border-black/[0.06] text-black/60 group-hover:text-black'
						}
					`}
				>
					<span className='text-[10px] font-extrabold uppercase tracking-wider sm:text-[11px]'>
						{trainingDay.isRestDay
							? 'View Plan'
							: isToday
								? 'Start Now'
								: 'View Session'}
					</span>

					<div
						className={`
							flex h-6 w-6 items-center justify-center rounded-full
							transition-all duration-300 sm:h-7 sm:w-7
							${
								isToday
									? 'bg-black text-white group-hover:scale-110'
									: 'bg-black/[0.05] text-black group-hover:bg-black group-hover:text-white'
							}
						`}
					>
						<span className='text-[11px] font-bold transition-transform group-hover:translate-x-0.5 sm:text-[12px]'>
							→
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
