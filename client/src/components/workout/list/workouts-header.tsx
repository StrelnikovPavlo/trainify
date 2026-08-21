import { IGeneratedPlan } from '@/types/training-plan.types'

interface IWorkoutsHeaderProps {
	data: IGeneratedPlan
	formattedDate: string
}

export function WorkoutsHeader({ data, formattedDate }: IWorkoutsHeaderProps) {
	return (
		<div className='mb-6 mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-end sm:justify-between'>
			<div>
				<div className='mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gray sm:text-[12px]'>
					{formattedDate}
				</div>

				<h1 className='font-alumni text-[42px] uppercase leading-none sm:text-[52px]'>
					My workouts
				</h1>

				<p className='mt-1.5 text-[13px] text-gray sm:text-[14px]'>
					{data.name}
				</p>
			</div>

			<div className='flex items-center justify-between rounded-2xl bg-gray-50 p-3 sm:block sm:bg-transparent sm:p-0 sm:text-right'>
				<div className='text-[11px] font-bold uppercase tracking-[0.08em] text-gray sm:text-[12px]'>
					Plan duration
				</div>

				<div className='text-[20px] font-bold sm:mt-1 sm:text-[24px]'>
					{data.durationDays}{' '}
					<span className='text-[13px] font-medium text-gray'>days</span>
				</div>
			</div>
		</div>
	)
}
