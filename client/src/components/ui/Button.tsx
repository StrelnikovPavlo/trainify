import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
}

export function Button({ children, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className='text-[20px] uppercase font-bold font-alumni text-white bg-black w-full h-[48px] rounded-[8px]'
		>
			{children}
		</button>
	)
}
