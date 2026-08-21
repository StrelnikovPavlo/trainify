// src/components/workout/details/workout-success-modal.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import Link from 'next/link'

interface WorkoutSuccessModalProps {
	isOpen: boolean
	onClose: () => void
	dayName: string
}

export function WorkoutSuccessModal({
	isOpen,
	onClose,
	dayName,
}: WorkoutSuccessModalProps) {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
			<div className='w-full max-w-[420px] rounded-2xl bg-white p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200'>
				{/* Іконка святкування */}
				<div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl'>
					🎉
				</div>

				<h2 className='font-alumni text-[36px] uppercase leading-none text-black'>
					Workout Completed!
				</h2>

				<p className='mt-2 text-[14px] text-gray'>
					Great job completing{' '}
					<span className='font-semibold text-black'>{dayName}</span>. Keep up
					the consistency!
				</p>

				<div className='mt-6 flex flex-col gap-2'>
					<Link href={DASHBOARD_PAGES.WORKOUTS} className='w-full'>
						<Button className='btn-black w-full py-3'>Back to Workouts</Button>
					</Link>

					<button
						onClick={onClose}
						className='py-2 text-[13px] font-semibold text-gray hover:text-black transition'
					>
						Review Session
					</button>
				</div>
			</div>
		</div>
	)
}
