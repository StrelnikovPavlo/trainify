import { CreateUserDto } from '@/users/dto/create-user.dto'
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AUTH_ROUTES } from './constants/path.constants'
import { LoginDto } from './dto/login.dto'

@Controller(AUTH_ROUTES.CONTROLLER)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post(AUTH_ROUTES.REGISTER)
	register(@Body() dto: CreateUserDto) {}

	@Post(AUTH_ROUTES.LOGIN)
	login(@Body() dto: LoginDto) {}
}
