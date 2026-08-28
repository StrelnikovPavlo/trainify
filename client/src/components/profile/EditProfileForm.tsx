'use client'

import { FormError } from '@/components/ui/Error'
import { Input } from '@/components/ui/Input'
import { getErrorMessage } from '@/lib/get-error-message'
import { IUpdateUser, IUser } from '@/types/profile.types'
import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'

interface EditProfileFormProps {
	user?: IUser
	onSave: (dto: IUpdateUser) => Promise<unknown>
	onCancel: () => void
	isSaving: boolean
	error: unknown
}

export function EditProfileForm({
	user,
	onSave,
	onCancel,
	isSaving,
	error,
}: EditProfileFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors: validationErrors },
	} = useForm<IUpdateUser>({
		defaultValues: {
			username: user?.username ?? '',
			surname: user?.surname ?? '',
			email: user?.email ?? '',
		},
	})

	const onSubmit = (dto: IUpdateUser) => onSave(dto)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
			<div className='grid gap-3 sm:grid-cols-2'>
				<div className='flex flex-col'>
					<Input
						{...register('username')}
						placeholder='First name'
						className='text-left text-[14px] border border-black/[0.08] outline-none focus:border-black/25'
					/>
					<ErrorMessage
						name='username'
						errors={validationErrors}
						render={({ message }) => <FormError message={message} />}
					/>
				</div>

				<div className='flex flex-col'>
					<Input
						{...register('surname')}
						placeholder='Last name'
						className='text-left text-[14px] border border-black/[0.08] outline-none focus:border-black/25'
					/>
					<ErrorMessage
						name='surname'
						errors={validationErrors}
						render={({ message }) => <FormError message={message} />}
					/>
				</div>
			</div>

			<div className='flex flex-col'>
				<Input
					type='email'
					{...register('email')}
					placeholder='Email'
					className='text-left text-[14px] border border-black/[0.08] outline-none focus:border-black/25'
				/>
				<ErrorMessage
					name='email'
					errors={validationErrors}
					render={({ message }) => <FormError message={message} />}
				/>
			</div>

			{Boolean(error) && <FormError message={getErrorMessage(error)} />}

			<div className='mt-1 flex gap-2'>
				<button
					type='submit'
					disabled={isSaving}
					className='btn btn-black flex-1 py-3 text-[12px] font-black uppercase tracking-wide disabled:opacity-50'
				>
					{isSaving ? 'Saving...' : 'Save'}
				</button>
				<button
					type='button'
					onClick={onCancel}
					className='flex-1 rounded-2xl border border-black/[0.08] py-3 text-[12px] font-bold uppercase tracking-wide text-black/50'
				>
					Cancel
				</button>
			</div>
		</form>
	)
}
