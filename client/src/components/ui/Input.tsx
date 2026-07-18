import { InputHTMLAttributes } from 'react'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			{...props}
			className='w-full h-[48px] text-gray font-medium border border-gray rounded-[8px] px-[23px]'
		/>
	)
}
