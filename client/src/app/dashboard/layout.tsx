'use client'

import Menu from '@/components/dashboard/Menu'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useProfile } from '@/hooks/useProfile'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
	const { user, isLoading } = useProfile()

	return (
		<div className='min-h-screen bg-[#f6f6f6]'>
			<header className='mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-2 px-4 sm:h-[88px] sm:px-6'>
				<Link
					href={DASHBOARD_PAGES.HOME}
					className='shrink-0 font-alumni text-[24px] font-bold tracking-[-0.03em] text-[#231f1f] sm:text-[32px]'
				>
					Trainify<span className='text-primary'>.</span>
				</Link>

				<Menu />

				<Link
					href={DASHBOARD_PAGES.PROFILE}
					className='group flex shrink-0 items-center gap-2 rounded-full border border-black/5 bg-white py-1 pl-1 pr-1 transition-all hover:border-black/10 hover:shadow-sm sm:gap-3 sm:py-1.5 sm:pl-2 sm:pr-4'
				>
					<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#231f1f] text-sm font-semibold text-white sm:h-9 sm:w-9'>
						{user?.username?.charAt(0).toUpperCase() ?? '?'}
					</div>

					<div className='hidden text-right sm:block'>
						<p className='text-[13px] font-semibold leading-tight text-[#231f1f]'>
							{isLoading ? 'Loading...' : `${user?.surname} ${user?.username}`}
						</p>

						<p className='mt-0.5 text-[11px] text-black/40'>My profile</p>
					</div>
				</Link>
			</header>

			<main className='mx-auto max-w-[1400px] px-4 pb-10 sm:px-6'>
				{children}
			</main>
		</div>
	)
}
