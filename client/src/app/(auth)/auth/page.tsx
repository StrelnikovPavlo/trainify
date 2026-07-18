'use client'

import { Button } from '@/components/ui/Button'
import { FormError } from '@/components/ui/Error'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

export default function AuthPage() {
	const { isRegister, onSubmit, errorMessage, toggleMode, form } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = form

	return (
		<div className='flex flex-col items-center justify-center w-full h-screen'>
			<div className='w-full max-w-[450px] flex flex-col gap-y-[20px]'>
				<h1 className='uppercase font-bold text-[48px] text-center font-alumni'>
					{isRegister ? 'Create account' : 'Login'}
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full flex flex-col gap-y-[20px]'
				>
					{isRegister && (
						<div className='grid grid-cols-2 gap-x-[20px]'>
							<div className='flex flex-col gap-y-[10px]'>
								<Input
									{...register('username', {
										required: isRegister ? 'Username is required' : false,
										minLength: {
											value: 2,
											message: 'Username must be at least 2 characters',
										},
									})}
									type='text'
									placeholder='Username'
								/>
								<FormError message={errors.username?.message} />
							</div>
							<div className='flex flex-col gap-y-[10px]'>
								<Input
									{...register('surname', {
										required: isRegister && 'Surname is required',
										minLength: {
											value: 2,
											message: 'Surname must be at least 2 characters',
										},
									})}
									type='text'
									placeholder='Surname'
								/>
								<FormError message={errors.surname?.message} />
							</div>
						</div>
					)}
					<div className='flex flex-col gap-y-[10px]'>
						<Input
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: 'Invalid email format',
								},
							})}
							name='email'
							type='email'
							placeholder='Email'
						/>
						<FormError message={errors.email?.message} />
					</div>
					<div className='flex flex-col gap-y-[10px]'>
						<Input
							{...register('password', {
								required: 'Password is required',
								minLength: { value: 8, message: 'Min 8 characters' },
								maxLength: { value: 16, message: 'Max 16 characters' },
								pattern: {
									value:
										/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
									message:
										'Min 1 uppercase, 1 lowercase, 1 number or special character',
								},
							})}
							name='password'
							type='password'
							placeholder='Password'
						/>
						<FormError message={errors.password?.message} />
					</div>
					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Loading...' : isRegister ? 'Continue' : 'Login'}
					</Button>
				</form>

				{errorMessage && (
					<div className='w-full bg-red-50 border border-red-200 rounded-[8px] px-4 py-3 text-center'>
						<FormError message={errorMessage} />
					</div>
				)}

				<p className='font-medium text-center text-green'>
					{isRegister ? 'Already have an account? ' : "Don't have an account? "}
					<button type='button' onClick={toggleMode} className='font-extrabold'>
						{isRegister ? 'Login' : 'Create one now'}
					</button>
				</p>
			</div>
		</div>
	)
}
