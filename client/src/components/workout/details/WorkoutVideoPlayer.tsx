'use client'

import { VideoOff } from 'lucide-react'

interface WorkoutVideoPlayerProps {
	videoUrl?: string
	exerciseName?: string
}

export function WorkoutVideoPlayer({
	videoUrl,
	exerciseName,
}: WorkoutVideoPlayerProps) {
	const hasVideo = Boolean(videoUrl)
	const hasExercise = Boolean(exerciseName)

	return (
		<div className='w-full lg:w-[320px] lg:flex-shrink-0 sticky top-6 overflow-hidden rounded-[24px] bg-black'>
			<div className='relative aspect-square w-full'>
				{hasVideo ? (
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
					<div className='flex h-full w-full flex-col items-center justify-center gap-2'>
						<VideoOff className='h-7 w-7 text-white/20' strokeWidth={1.5} />
						<span className='text-[12px] font-medium text-white/40'>
							{hasExercise ? 'No video available' : 'Select an exercise'}
						</span>
					</div>
				)}
			</div>

			{hasExercise && (
				<div className='border-t border-white/10 px-5 py-5'>
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
