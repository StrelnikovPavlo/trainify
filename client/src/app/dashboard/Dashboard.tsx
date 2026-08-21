'use client'

import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardMain } from '@/components/dashboard/dashboard-main'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { useDashboard } from '@/hooks/useDashboard'

export default function Dashboard() {
	const {
		days,
		profile,
		profileLoading,
		todayIndex,
		planLoading,
		todayWorkout,
		formattedDate,
		username,
		todayDate,
	} = useDashboard()

	if (planLoading) {
		return (
			<div className='flex min-h-[400px] items-center justify-center text-sm font-semibold text-black/40'>
				Loading your training plan...
			</div>
		)
	}

	return (
		<div className='w-full px-4 pb-12 sm:px-0'>
			<DashboardHeader
				formattedDate={formattedDate}
				isLoading={profileLoading}
				username={username}
			/>

			<div className='grid items-start gap-[20px] lg:grid-cols-[minmax(0,1fr)_340px] sm:gap-6'>
				<DashboardMain
					days={days}
					todayDate={todayDate}
					todayIndex={todayIndex}
					todayWorkout={todayWorkout}
				/>

				<DashboardSidebar profile={profile} />
			</div>
		</div>
	)
}
