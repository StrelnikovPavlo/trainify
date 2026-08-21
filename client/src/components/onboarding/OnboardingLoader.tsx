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
		}, 2000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#18181b] px-4 text-white'>
			<div className='relative flex flex-col items-center text-center max-w-[480px]'>
				{/* Анімоване пульсуюче кільце */}
				<div className='relative mb-10 flex h-32 w-32 items-center justify-center'>
					<div className='absolute h-full w-full rounded-full border-4 border-primary/20 animate-ping' />
					<div className='absolute h-full w-full rounded-full border-4 border-t-primary border-r-transparent border-b-primary/40 border-l-transparent animate-spin' />
					<div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-primary font-alumni text-[36px] font-black text-black shadow-xl shadow-primary/30'>
						⚡
					</div>
				</div>

				{/* Заголовок */}
				<h2 className='font-alumni text-[42px] font-bold uppercase leading-tight tracking-tight sm:text-[52px]'>
					Building Your Plan
				</h2>

				{/* Динамічний текст статусу */}
				<p className='mt-3 min-h-[48px] text-[14px] font-semibold text-white/60 transition-all duration-300'>
					{LOADING_STEPS[currentStepIndex]}
				</p>

				<p className='mt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-white/30'>
					Please wait a moment
				</p>
			</div>

			{/* Фонові декор-ефекти */}
			<div className='absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl' />
			<div className='absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl' />
		</div>
	)
}
