'use client'

import { Input } from '@/components/ui/Input'
import { ITrainingExercise } from '@/types/training-plan.types'
import clsx from 'clsx'

export interface SetInput {
	reps: number
}

interface ExerciseItemProps {
	exercise: ITrainingExercise
	orderNumber: number
	isOpen: boolean
	onToggle: () => void
	sets: SetInput[]
	onSetChange: (index: number, patch: Partial<SetInput>) => void
}

export function ExerciseItem({
	exercise,
	orderNumber,
	isOpen,
	onToggle,
	sets,
	onSetChange,
}: ExerciseItemProps) {
	return (
		<div
			className={clsx(
				'rounded-[20px] border bg-white transition-colors',
				isOpen ? 'border-black/15' : 'border-black/[0.06]',
			)}
		>
			<button
				type='button'
				onClick={onToggle}
				className='flex w-full items-center gap-4 p-4 text-left'
			>
				<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-[13px] font-bold text-white'>
					{orderNumber}
				</span>

				<div className='flex-1'>
					<h4 className='text-[16px] font-bold'>{exercise.exercise.name}</h4>
					<p className='mt-0.5 text-[12px] text-black/40'>
						{exercise.sets} sets · {exercise.reps} reps · {exercise.restSeconds}
						s rest
					</p>
				</div>

				<span
					className={clsx(
						'text-[12px] font-bold text-black/30 transition-transform',
						isOpen && 'rotate-180',
					)}
				>
					⌄
				</span>
			</button>

			{isOpen && (
				<div className='border-t border-black/[0.06] p-4 pt-3'>
					<div className='grid grid-cols-[40px_1fr] gap-2 pb-2 text-[10px] font-bold uppercase tracking-wide text-black/35'>
						<span>Set</span>
						<span>Reps</span>
					</div>

					<div className='flex flex-col gap-2'>
						{sets.map((set, index) => (
							<div
								key={index}
								className='grid grid-cols-[40px_1fr] items-center gap-2 rounded-[12px] bg-[#f8f9fa] px-3 py-2'
							>
								<span className='text-[13px] font-bold text-black/50'>
									{index + 1}
								</span>
								<Input
									type='number'
									min='0'
									value={set.reps === 0 ? '' : set.reps}
									onChange={e =>
										onSetChange(index, { reps: Number(e.target.value) })
									}
									className='h-[38px] rounded-[10px] border border-black/[0.08] bg-white px-3 text-[13px] outline-none focus:border-black/25'
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
