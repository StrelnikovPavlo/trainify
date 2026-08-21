'use client'

import { useProfile } from '@/hooks/useProfile'
import { authService } from '@/services/auth.service'
import { useRouter } from 'next/navigation'

export default function Profile() {
	const { data, isLoading } = useProfile()
	const { push } = useRouter()

	const handleLogout = async () => {
		try {
			await authService.logout()
			push('/login')
		} catch (error) {
			console.error('Помилка під час виходу:', error)
		}
	}

	const user = data?.user
	const initial = user?.username?.charAt(0).toUpperCase() ?? '?'

	if (isLoading) {
		return (
			<div className='flex min-h-[400px] items-center justify-center text-sm font-bold uppercase tracking-wider text-black/40'>
				Loading profile...
			</div>
		)
	}

	return (
		<div className='mx-auto max-w-[800px] px-4 py-6 sm:px-0 sm:py-10'>
			{/* Dark Hero Profile Card */}
			<section className='relative overflow-hidden rounded-[32px] bg-[#18181b] p-6 text-white shadow-2xl shadow-black/10 sm:p-8'>
				<div className='relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left'>
					{/* User Info & Avatar */}
					<div className='flex flex-col items-center gap-5 sm:flex-row sm:items-center'>
						{/* Avatar with Glow & Status Indicator */}
						<div className='relative'>
							<div className='flex h-24 w-24 items-center justify-center rounded-[24px] bg-primary font-alumni text-[54px] font-black text-black shadow-xl shadow-primary/20 sm:h-28 sm:w-28'>
								{initial}
							</div>
							<span className='absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#18181b] p-1'>
								<span className='h-3 w-3 rounded-full bg-emerald-400 animate-pulse' />
							</span>
						</div>

						<div>
							<div className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary backdrop-blur-md'>
								<span className='h-1.5 w-1.5 rounded-full bg-primary' />
								Active Athlete
							</div>

							<h1 className='mt-2 font-alumni text-[38px] font-bold uppercase leading-[0.95] tracking-tight sm:text-[50px]'>
								{`${user?.surname ?? ''} ${user?.username ?? ''}`.trim() ||
									'Athlete'}
							</h1>

							<p className='mt-1 text-[13px] font-medium text-white/50'>
								{user?.email ?? 'No email provided'}
							</p>
						</div>
					</div>

					{/* Logout Action */}
					<button
						onClick={handleLogout}
						className='inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-[11px] font-black uppercase tracking-wider text-red-400 transition-all hover:bg-red-500 hover:text-white active:scale-95'
					>
						<span>Log out</span>
						<span className='text-[14px]'>→</span>
					</button>
				</div>

				{/* Decorative Background Glows */}
				<div className='absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl' />
				<div className='absolute -bottom-24 -left-12 h-64 w-64 rounded-full border-[40px] border-white/[0.02]' />
			</section>

			{/* Personal Info Grid Tiles */}
			<section className='mt-6 space-y-3'>
				<p className='px-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-black/40'>
					Account details
				</p>

				<div className='grid gap-3 sm:grid-cols-2 sm:gap-4'>
					<ProfileTile label='First Name' value={user?.username} icon='👤' />
					<ProfileTile label='Last Name' value={user?.surname} icon='🪪' />
					<ProfileTile
						label='Email Address'
						value={user?.email}
						icon='✉️'
						colSpan
					/>
				</div>
			</section>
		</div>
	)
}

function ProfileTile({
	label,
	value,
	icon,
	colSpan = false,
}: {
	label: string
	value?: string
	icon: string
	colSpan?: boolean
}) {
	return (
		<div
			className={`flex items-center justify-between rounded-[24px] border border-black/[0.06] bg-white p-5 shadow-sm transition-all hover:border-black/15 ${
				colSpan ? 'sm:col-span-2' : ''
			}`}
		>
			<div>
				<p className='text-[9px] font-extrabold uppercase tracking-[0.12em] text-black/40'>
					{label}
				</p>

				<p className='mt-1 text-[16px] font-extrabold text-[#18181b] sm:text-[18px]'>
					{value || '—'}
				</p>
			</div>

			<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-black/[0.04] bg-gray-50 text-[18px]'>
				{icon}
			</div>
		</div>
	)
}
