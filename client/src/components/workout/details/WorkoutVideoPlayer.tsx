'use client'

interface WorkoutVideoPlayerProps {
	videoUrl?: string
	exerciseName?: string
}

export function WorkoutVideoPlayer({
	videoUrl,
	exerciseName,
}: WorkoutVideoPlayerProps) {
	return (
		<div className='sticky top-6 overflow-hidden rounded-[24px] bg-black'>
			{videoUrl ? (
				<video
					key={videoUrl}
					src={videoUrl}
					autoPlay
					muted
					loop
					playsInline
					className='aspect-square w-full object-cover'
				/>
			) : (
				<div className='flex aspect-square w-full items-center justify-center text-[13px] text-white/40'>
					Select an exercise
				</div>
			)}

			{exerciseName && (
				<div className='px-4 py-3'>
					<p className='text-[10px] font-bold uppercase tracking-wide text-white/40'>
						Now showing
					</p>
					<h4 className='font-alumni text-[22px] font-bold uppercase leading-none text-white'>
						{exerciseName}
					</h4>
				</div>
			)}
		</div>
	)
}
