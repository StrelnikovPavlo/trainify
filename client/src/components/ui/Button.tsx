import clsx from 'clsx'
import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
}

export function Button({
	children,
	className,
	disabled,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			disabled={disabled}
			className={clsx(
				'btn',
				disabled && 'opacity-50 cursor-not-allowed',
				className,
			)}
		>
			{children}
		</button>
	)
}
