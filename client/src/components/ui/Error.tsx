import { getErrorMessage } from '@/lib/get-error-message'

interface FormErrorProps {
	error?: unknown
	message?: string
}

export function FormError({ message, error }: FormErrorProps) {
	const content = message || (error ? getErrorMessage(error) : null)

	if (!content) return null

	return <span className='text-red-500 text-center text-sm'>{content}</span>
}
