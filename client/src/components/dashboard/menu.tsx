'use client'

import { NAVIGATION } from '@/config/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Menu() {
	const pathname = usePathname()

	return (
		<>
			<nav className='hidden items-center gap-1.5 rounded-2xl border border-white/10 bg-[#18181b] p-1.5 shadow-xl shadow-black/10 backdrop-blur-md sm:inline-flex'>
				{NAVIGATION.map(item => {
					const isActive = pathname === item.url

					return (
						<Link
							key={item.value}
							href={item.url}
							className={`
                relative flex items-center gap-2 rounded-xl px-4 py-2
                text-[11px] font-black uppercase tracking-wider
                transition-all duration-200 active:scale-95
                ${
									isActive
										? 'bg-primary text-black shadow-md shadow-primary/25'
										: 'text-white/50 hover:bg-white/[0.08] hover:text-white'
								}
              `}
						>
							{isActive && (
								<span className='h-1.5 w-1.5 rounded-full bg-black animate-pulse' />
							)}

							<span>{item.value}</span>
						</Link>
					)
				})}
			</nav>

			<nav className='fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-white/10 bg-[#18181b] px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] sm:hidden'>
				{NAVIGATION.map(item => {
					const isActive = pathname === item.url

					return (
						<Link
							key={item.value}
							href={item.url}
							className={`
                relative flex flex-1 flex-col items-center gap-1 rounded-xl py-2
                text-[10px] font-black uppercase tracking-wider
                transition-all duration-200 active:scale-95
                ${isActive ? 'text-primary' : 'text-white/50 hover:text-white'}
              `}
						>
							{isActive && (
								<span className='absolute top-0.5 h-1 w-1 rounded-full bg-primary animate-pulse' />
							)}

							<span>{item.value}</span>
						</Link>
					)
				})}
			</nav>
		</>
	)
}
