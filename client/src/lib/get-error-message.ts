import axios from 'axios'

export const getErrorMessage = (
	error: unknown,
	fallback = 'An unknown error occurred',
): string => {
	if (axios.isAxiosError(error)) {
		const message = error.response?.data.message
		return Array.isArray(message) ? message[0] : (message ?? fallback)
	}

	if (error instanceof Error) {
		return error.message
	}

	return fallback
}
