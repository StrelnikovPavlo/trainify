'use client'

import { useEffect, useState } from 'react'

const LOADING_STEPS = [
	'Analyzing your body metrics...',
	'Calculating training splits & volume...',
	'Selecting exercises & rest intervals...',
	'Finalizing your personalized plan...',
]

export function OnboardingLoader() {
	const [currentStepIndex, setCurrentStepIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentStepIndex(prev => (prev + 1) % LOADING_STEPS.length)
		}, 2500)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#18181b] px-4 text-white'>
			<div className='relative flex flex-col items-center text-center max-w-[480px]'>
				<div className='relative mb-10 flex h-32 w-32 items-center justify-center'>
					<div className='absolute h-full w-full rounded-full border-4 border-primary/20 animate-ping' />
					<div className='absolute h-full w-full rounded-full border-4 border-t-primary border-r-transparent border-b-primary/40 border-l-transparent animate-spin' />
					<div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-primary font-alumni text-[36px] font-black text-black shadow-xl shadow-primary/30'>
						⚡
					</div>
				</div>

				<h2 className='font-alumni text-[42px] font-bold uppercase leading-tight tracking-tight sm:text-[52px]'>
					Building Your Plan
				</h2>

				<p className='mt-3 min-h-[48px] text-[14px] font-semibold text-white/60 transition-all duration-300'>
					{LOADING_STEPS[currentStepIndex]}
				</p>

				<div className='mt-8 flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 backdrop-blur-md max-w-[340px]'>
					<div className='flex items-center gap-2 text-amber-400/90 text-[11px] font-bold uppercase tracking-wider'>
						<span className='relative flex h-2 w-2'>
							<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75'></span>
							<span className='relative inline-flex rounded-full h-2 w-2 bg-amber-500'></span>
						</span>
						AI Generation in progress
					</div>
					<p className='text-[12px] font-medium text-white/40 leading-relaxed'>
						This may take up to{' '}
						<span className='text-white/70 font-semibold'>1 minute</span> as AI
						creates your customized program. Please don&apos;t close this page.
					</p>
				</div>
			</div>

			<div className='absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl' />
			<div className='absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl' />
		</div>
	)
}
