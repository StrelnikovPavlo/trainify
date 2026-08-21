'use client'

interface IDashboardHeaderProps {
	formattedDate: string
	username?: string
	isLoading: boolean
}

export function DashboardHeader({
	formattedDate,
	username,
	isLoading,
}: IDashboardHeaderProps) {
	return (
		<header className='mb-[24px] mt-[24px] sm:mb-8 sm:mt-8'>
			<p className='mb-[5px] text-[11px] font-bold uppercase tracking-[3px] text-black/40 sm:text-[12px]'>
				{formattedDate}
			</p>

			<h1 className='font-alumni text-[42px] font-bold uppercase leading-[0.9] tracking-tight text-[#18181b] sm:text-[58px] lg:text-[66px]'>
				Welcome back, {isLoading ? '...' : username || 'Undefined'}
			</h1>
		</header>
	)
}
