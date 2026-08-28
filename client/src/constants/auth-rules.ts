import { IRegisterDto } from '@/types/auth.types'
import { RegisterOptions } from 'react-hook-form'

export const AUTH_RULES: {
	[K in keyof IRegisterDto]?: RegisterOptions<IRegisterDto, K>
} = {
	username: {
		required: 'Username is required',
		minLength: { value: 2, message: 'Username must be at least 2 characters' },
	},
	surname: {
		required: 'Surname is required',
		minLength: { value: 2, message: 'Surname must be at least 2 characters' },
	},
	email: {
		required: 'Email is required',
		pattern: {
			value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			message: 'Invalid email format',
		},
	},
	password: {
		required: 'Password is required',
		minLength: { value: 8, message: 'Min 8 characters' },
		maxLength: { value: 16, message: 'Max 16 characters' },
		pattern: {
			value: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
			message: 'Min 1 uppercase, 1 lowercase, 1 number or special character',
		},
	},
}
