export interface IRegisterDto {
	username: string
	surname: string
	email: string
	password: string
}

export interface ILoginDto {
	email: string
	password: string
}

export interface AuthState {
	accessToken: string | null
	setAccessToken: (token: string | null) => void
	isAuthenticated: boolean
}

export interface IAuthResponse {
	accessToken: string
}

export type IAuthForm = IRegisterDto
