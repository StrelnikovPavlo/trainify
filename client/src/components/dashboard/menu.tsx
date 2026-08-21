'use client'

import { NAVIGATION } from '@/config/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Menu() {
	const pathname = usePathname()

	return (
		<nav className='inline-flex items-center gap-1.5 rounded-2xl border border-white/10 bg-[#18181b] p-1.5 shadow-xl shadow-black/10 backdrop-blur-md'>
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
	)
}
