import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { UserProfileDto } from './dto/create-profile.dto'
import { UpdateUserProfileDto } from './dto/update-profile.dto'
import { UserProfileService } from './user-profile.service'

@ApiBearerAuth()
@ApiTags('Profile')
@Controller(ROUTES.userProfile.base)
export class UserProfileController {
	constructor(private readonly userProfileService: UserProfileService) {}

	@ApiOperation({ summary: 'Create user profile' })
	@ApiCreatedResponse({ description: 'Profile successfully created' })
	@ApiConflictResponse({
		description: 'A profile for this user already exists'
	})
	@Post()
	create(@CurrentUser('id') userId: string, @Body() dto: UserProfileDto) {
		return this.userProfileService.create(userId, dto)
	}

	@ApiOperation({ summary: 'Get current user profile' })
	@ApiOkResponse({ description: 'Profile returned successfully' })
	@ApiNotFoundResponse({ description: 'No profile found for this user' })
	@Get(ROUTES.userProfile.me)
	getProfile(@CurrentUser('id') userId: string) {
		return this.userProfileService.findByUserId(userId)
	}

	@ApiOperation({ summary: 'Update current user profile' })
	@ApiOkResponse({ description: 'Profile successfully updated' })
	@ApiNotFoundResponse({ description: 'No profile found for this user' })
	@Put()
	update(@CurrentUser('id') userId: string, @Body() dto: UpdateUserProfileDto) {
		return this.userProfileService.update(userId, dto)
	}
}
