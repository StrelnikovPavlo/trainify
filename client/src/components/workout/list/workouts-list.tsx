import { ITrainingDay } from '@/types/training-plan.types'
import { WorkoutsListItem } from './workouts-list-item'

interface WorkoutsListProps {
	trainingDays: ITrainingDay[]
	completedTrainingDays: number
	currentDateString: string
}

export function WorkoutsList({
	trainingDays,
	currentDateString,
	completedTrainingDays,
}: WorkoutsListProps) {
	return (
		<section>
			<div className='mb-3 flex items-center justify-between'>
				<div>
					<h3 className='text-[18px] font-bold sm:text-[20px]'>
						Training Schedule
					</h3>

					<p className='text-[11px] text-gray sm:text-[12px]'>
						Swipe to explore workout days
					</p>
				</div>

				<div className='rounded-full bg-black/5 px-3 py-1 text-[11px] font-bold text-black/70 sm:text-[12px]'>
					{completedTrainingDays} workouts
				</div>
			</div>

			<div className='relative -mx-4 w-[calc(100%+2rem)] sm:mx-0 sm:w-full'>
				<div className='no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-4 pt-1 sm:gap-4 sm:px-0'>
					{trainingDays.slice(0, 7).map((trainingDay, index) => (
						<WorkoutsListItem
							key={trainingDay.id ?? index}
							trainingDay={trainingDay}
							dayNumber={index + 1}
							isToday={trainingDay.date?.split('T')[0] === currentDateString}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
