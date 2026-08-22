'use client'

import { useDashboard } from '@/hooks/useDashboard'
import { WeightTracker } from './WeightTracker'

export function DashboardSidebar() {
	const { profile } = useDashboard()

	return (
		<aside className='space-y-5 lg:sticky lg:top-5'>
			<WeightTracker
				weight={profile?.weight}
				targetWeight={profile?.targetWeight}
			/>

			<div className='relative overflow-hidden rounded-[26px] bg-primary p-6 text-black shadow-lg shadow-primary/20'>
				<p className='mb-6 text-[10px] font-extrabold uppercase tracking-[0.14em] text-black/50'>
					Your Focus
				</p>

				<p className='font-alumni text-[36px] font-bold uppercase leading-[0.92] tracking-tight sm:text-[40px]'>
					Consistency <br /> over perfection.
				</p>

				<div className='mt-6 border-t border-black/10 pt-4'>
					<p className='text-[12px] font-medium leading-relaxed text-black/70'>
						Follow your plan step by step. Every completed session brings you
						closer to your goals.
					</p>
				</div>
			</div>
		</aside>
	)
}
