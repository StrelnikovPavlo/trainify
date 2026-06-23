import { CreateUserDto } from '@/users/dto/create-user.dto'
import {
	Body,
	Controller,
	Post,
	Req,
	Res,
	UnauthorizedException
} from '@nestjs/common'
import type { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { AUTH_ROUTES } from './constants/routes.constants'
import { LoginDto } from './dto/login.dto'

@Controller(AUTH_ROUTES.CONTROLLER)
export class AuthController {
	REFRESH_TOKEN_NAME = 'refreshToken'
	REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000

	constructor(private readonly authService: AuthService) {}

	@Post(AUTH_ROUTES.REGISTER)
	async register(
		@Body() dto: CreateUserDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { accessToken, refreshToken } = await this.authService.register(dto)
		this.setRefreshCookie(res, refreshToken)
		return { accessToken }
	}

	@Post(AUTH_ROUTES.LOGIN)
	async login(
		@Body() dto: LoginDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { accessToken, refreshToken } = await this.authService.login(dto)
		this.setRefreshCookie(res, refreshToken)
		return { accessToken }
	}

	@Post(AUTH_ROUTES.LOGOUT)
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const rawRefreshToken = req.cookies?.[this.REFRESH_TOKEN_NAME] as
			| string
			| undefined

		if (rawRefreshToken) {
			await this.authService.logout(rawRefreshToken)
		}

		res.clearCookie(this.REFRESH_TOKEN_NAME)
		return { message: 'Logged out' }
	}

	@Post(AUTH_ROUTES.REFRESH)
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const rawRefreshToken = req.cookies?.[this.REFRESH_TOKEN_NAME] as
			| string
			| undefined

		if (!rawRefreshToken) {
			throw new UnauthorizedException('Refresh token missing')
		}

		const { accessToken, refreshToken } =
			await this.authService.refreshTokens(rawRefreshToken)

		this.setRefreshCookie(res, refreshToken)
		return { accessToken }
	}

	private setRefreshCookie(res: Response, token: string) {
		res.cookie(this.REFRESH_TOKEN_NAME, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: this.REFRESH_TOKEN_MAX_AGE
		})
	}
}
