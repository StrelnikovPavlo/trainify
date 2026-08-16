import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserProfileDto } from './dto/create-profile.dto'
import { UserProfileService } from './user-profile.service'

@ApiBearerAuth()
@ApiTags('Profile')
@Controller(ROUTES.userProfile.base)
export class UserProfileController {
	constructor(private readonly userProfileService: UserProfileService) {}

	@ApiOperation({ summary: 'Create user profile' })
	@Post()
	create(@CurrentUser('id') userId: string, @Body() dto: UserProfileDto) {
		return this.userProfileService.create(userId, dto)
	}

	@ApiOperation({ summary: 'Get current user profile' })
	@Get(ROUTES.userProfile.me)
	getProfile(@CurrentUser('id') userId: string) {
		return this.userProfileService.findByUserId(userId)
	}
}
