interface GenerationErrorProps {
	message: string
	onRetry: () => void
}

export function GenerationError({ message, onRetry }: GenerationErrorProps) {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-gray-50/50 px-4'>
			<div className='w-full max-w-[480px] rounded-[32px] border border-black/[0.06] bg-white p-10 text-center shadow-xl shadow-black/5'>
				<div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50'>
					<svg
						className='h-8 w-8 text-red-500'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 9v3.75m0 3.75h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</div>

				<h1 className='font-alumni text-4xl font-bold uppercase tracking-tight text-[#18181b]'>
					Generation failed
				</h1>

				<p className='mt-3 text-[14px] text-black/40'>{message}</p>

				<button
					type='button'
					onClick={onRetry}
					className='btn-yellow mt-8 w-full px-8 py-3.5 text-[13px] font-black uppercase tracking-wider'
				>
					Try again
				</button>
			</div>
		</div>
	)
}
