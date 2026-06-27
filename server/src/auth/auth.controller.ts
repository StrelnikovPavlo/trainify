import { CreateUserDto } from '@/users/dto/create-user.dto'
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UnauthorizedException
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import type { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { AUTH_ROUTES } from './constants/routes.constants'
import { Public } from './decorators/public.decorator'
import { LoginDto } from './dto/login.dto'

@ApiTags('Auth')
@Controller(AUTH_ROUTES.CONTROLLER)
export class AuthController {
	REFRESH_TOKEN_NAME = 'refreshToken'
	REFRESH_TOKEN_MAX_AGE = 15 * 24 * 60 * 60 * 1000

	constructor(private readonly authService: AuthService) {}

	@Public()
	@ApiOperation({ summary: 'Registration' })
	@Post(AUTH_ROUTES.REGISTER)
	async register(
		@Body() dto: CreateUserDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { accessToken, refreshToken } = await this.authService.register(dto)
		this.setRefreshCookie(res, refreshToken)
		return { accessToken }
	}

	@Public()
	@ApiOperation({ summary: 'Login' })
	@Post(AUTH_ROUTES.LOGIN)
	@HttpCode(HttpStatus.OK)
	async login(
		@Body() dto: LoginDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { accessToken, refreshToken } = await this.authService.login(dto)
		this.setRefreshCookie(res, refreshToken)
		return { accessToken }
	}

	@Public()
	@ApiOperation({ summary: 'Logout' })
	@Post(AUTH_ROUTES.LOGOUT)
	@HttpCode(HttpStatus.OK)
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

	@Public()
	@ApiOperation({ summary: 'Refresh access token' })
	@Post(AUTH_ROUTES.REFRESH)
	@HttpCode(HttpStatus.OK)
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
