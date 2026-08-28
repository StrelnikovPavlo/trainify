'use client'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardMain } from '@/components/dashboard/DashboardMain'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { useDashboard } from '@/hooks/useDashboard'

export default function Dashboard() {
	const { planLoading } = useDashboard()

	if (planLoading) {
		return (
			<div className='flex min-h-[400px] items-center justify-center text-sm font-semibold text-black/40'>
				Loading your training plan...
			</div>
		)
	}

	return (
		<div className='w-full px-4 pb-12 sm:px-0'>
			<DashboardHeader />

			<div className='grid items-start gap-[20px] lg:grid-cols-[minmax(0,1fr)_340px] sm:gap-6'>
				<DashboardMain />

				<DashboardSidebar />
			</div>
		</div>
	)
}
