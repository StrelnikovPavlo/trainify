'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useRouter } from 'next/navigation'

interface FinishWorkoutModalProps {
	isOpen: boolean
}

export function FinishWorkoutModal({ isOpen }: FinishWorkoutModalProps) {
	const { push } = useRouter()

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200'>
			<div className='relative w-full max-w-[380px] scale-100 overflow-hidden rounded-[32px] border border-black/10 bg-white p-7 text-center shadow-2xl transition-all animate-in zoom-in-95 duration-200'>
				<div className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-black shadow-md shadow-primary/20'>
					<svg
						className='h-8 w-8 stroke-[3]'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M5 13l4 4L19 7'
						/>
					</svg>
				</div>

				<h2 className='font-alumni text-4xl font-bold uppercase tracking-wide text-black'>
					Workout complete!
				</h2>

				<p className='mt-2 text-[13px] font-medium leading-relaxed text-black/50'>
					Great job staying consistent. Your stats and progress have been saved.
				</p>

				<button
					type='button'
					onClick={() => push(DASHBOARD_PAGES.WORKOUTS)}
					className='btn btn-yellow mt-6 flex h-[52px] w-full items-center justify-center rounded-2xl text-[13px] font-black uppercase tracking-wider text-black shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]'
				>
					Back to schedule
				</button>
			</div>
		</div>
	)
}
