'use client'

import { IUser } from '@/types/profile.types'

interface ProfileHeaderProps {
	user?: IUser
	onLogout: () => void
}

export function ProfileHeader({ user, onLogout }: ProfileHeaderProps) {
	const initial = user?.username?.charAt(0).toUpperCase() ?? '?'

	return (
		<section className='relative overflow-hidden rounded-[32px] bg-[#18181b] p-6 text-white shadow-2xl shadow-black/10 sm:p-8'>
			<div className='relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left'>
				<div className='flex flex-col items-center gap-5 sm:flex-row sm:items-center'>
					<div className='flex h-24 w-24 items-center justify-center rounded-[24px] bg-primary font-alumni text-[54px] font-black text-black shadow-xl shadow-primary/20 sm:h-28 sm:w-28'>
						{initial}
					</div>

					<div>
						<h1 className='font-alumni text-[38px] font-bold uppercase leading-[0.95] tracking-tight sm:text-[50px]'>
							{`${user?.surname ?? ''} ${user?.username ?? ''}`.trim() ||
								'Athlete'}
						</h1>
						<p className='mt-1 text-[13px] font-medium text-white/50'>
							{user?.email ?? 'No email provided'}
						</p>
					</div>
				</div>

				<button
					onClick={onLogout}
					className='inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-[11px] font-black uppercase tracking-wider text-red-400 transition-all hover:bg-red-500 hover:text-white active:scale-95'
				>
					Log out →
				</button>
			</div>
		</section>
	)
}
