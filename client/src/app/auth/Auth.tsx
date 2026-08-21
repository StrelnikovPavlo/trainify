'use client'

import { AuthSidebar } from '@/components/auth/AuthSidebar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AUTH_RULES } from '@/constants/auth-rules'
import { useAuth } from '@/hooks/useAuth'

export function Auth() {
	const {
		isRegister,
		onSubmit,
		handleSubmit,
		register,
		toggleMode,
		isPending,
	} = useAuth()

	return (
		<div className='min-h-screen bg-[#f6f6f6] lg:grid lg:grid-cols-2'>
			<AuthSidebar />

			<div className='flex min-h-screen items-center justify-center px-6 py-10 sm:px-10'>
				<div className='w-full max-w-[430px]'>
					<div className='mb-12 lg:hidden'>
						<span className='font-alumni text-[34px] font-bold tracking-[-0.03em] text-[#231f1f]'>
							Trainify<span className='text-primary'>.</span>
						</span>
					</div>

					<div className='mb-8'>
						<p className='mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-black/30'>
							{isRegister ? 'Get started' : 'Welcome back'}
						</p>

						<h1 className='font-alumni text-[52px] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-[#231f1f]'>
							{isRegister ? 'Create account' : 'Login'}
						</h1>

						<p className='mt-3 text-[13px] text-black/35'>
							{isRegister
								? 'Create your account and start your journey.'
								: 'Sign in to continue your training journey.'}
						</p>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-4'
					>
						{isRegister && (
							<div className='grid grid-cols-2 gap-3'>
								<Input
									{...register('username', AUTH_RULES.username)}
									className='h-[54px] rounded-[16px] border-black/[0.06] bg-white px-4 text-[14px] shadow-none outline-none transition-all placeholder:text-black/25 focus:border-black/20 focus:ring-0'
									placeholder='Name'
								/>

								<Input
									{...register('surname', AUTH_RULES.surname)}
									className='h-[54px] rounded-[16px] border-black/[0.06] bg-white px-4 text-[14px] shadow-none outline-none transition-all placeholder:text-black/25 focus:border-black/20 focus:ring-0'
									placeholder='Surname'
								/>
							</div>
						)}

						<Input
							{...register('email', AUTH_RULES.email)}
							className='h-[54px] rounded-[16px] border-black/[0.06] bg-white px-4 text-[14px] shadow-none outline-none transition-all placeholder:text-black/25 focus:border-black/20 focus:ring-0'
							type='email'
							placeholder='Email address'
						/>

						<Input
							{...register('password', AUTH_RULES.password)}
							className='h-[54px] rounded-[16px] border-black/[0.06] bg-white px-4 text-[14px] shadow-none outline-none transition-all placeholder:text-black/25 focus:border-black/20 focus:ring-0'
							type='password'
							placeholder='Password'
						/>

						<Button
							type='submit'
							disabled={isPending}
							className='mt-2 h-[54px] w-full rounded-[16px] bg-[#231f1f] text-[13px] font-bold uppercase tracking-wide text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-50'
						>
							{isPending
								? 'Loading...'
								: isRegister
									? 'Create account'
									: 'Login'}
						</Button>
					</form>

					<div className='mt-7 text-center'>
						<p className='text-[12px] font-medium text-black/35'>
							{isRegister
								? 'Already have an account?'
								: "Don't have an account?"}
						</p>

						<button
							type='button'
							onClick={toggleMode}
							className='mt-1 font-alumni text-[19px] font-bold uppercase text-[#231f1f] transition-colors hover:text-black/50'
						>
							{isRegister ? 'Login' : 'Create one now'} →
						</button>
					</div>

					<p className='mt-12 text-center text-[10px] font-medium uppercase tracking-[0.08em] text-black/20'>
						Train smarter. Get stronger.
					</p>
				</div>
			</div>
		</div>
	)
}
