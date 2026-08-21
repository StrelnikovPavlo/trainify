'use client'

import Menu from '@/components/dashboard/menu'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useProfile } from '@/hooks/useProfile'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
	const { data, isLoading } = useProfile()

	return (
		<div className='min-h-screen bg-[#f6f6f6]'>
			<header className='mx-auto flex h-[88px] max-w-[1400px] items-center justify-between px-6'>
				{/* Logo */}
				<Link
					href={DASHBOARD_PAGES.HOME}
					className='font-alumni text-[32px] font-bold tracking-[-0.03em] text-[#231f1f]'
				>
					Trainify<span className='text-primary'>.</span>
				</Link>

				{/* Navigation */}
				<Menu />

				{/* Profile */}
				<Link
					href={DASHBOARD_PAGES.PROFILE}
					className='group flex items-center gap-3 rounded-full border border-black/5 bg-white py-1.5 pl-2 pr-4 transition-all hover:border-black/10 hover:shadow-sm'
				>
					<div className='flex h-9 w-9 items-center justify-center rounded-full bg-[#231f1f] text-sm font-semibold text-white'>
						{data?.user?.username?.charAt(0).toUpperCase() ?? '?'}
					</div>

					<div className='hidden text-right sm:block'>
						<p className='text-[13px] font-semibold leading-tight text-[#231f1f]'>
							{isLoading
								? 'Loading...'
								: `${data?.user.surname} ${data?.user.username}`}
						</p>

						<p className='mt-0.5 text-[11px] text-black/40'>My profile</p>
					</div>
				</Link>
			</header>

			<main className='mx-auto max-w-[1400px] px-6 pb-10'>{children}</main>
		</div>
	)
}
