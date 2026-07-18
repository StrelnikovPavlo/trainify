import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { Body, Controller, Get, Post } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { UserProfileDto } from './dto/create-profile.dto'
import { UserProfileService } from './user-profile.service'

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('user-profile')
export class UserProfileController {
	constructor(private readonly userProfileService: UserProfileService) {}

	@Post()
	@ApiOperation({ summary: 'Create user profile' })
	@ApiBody({ type: UserProfileDto })
	@ApiCreatedResponse({
		description: 'The profile has been successfully created.'
	})
	@ApiConflictResponse({
		description: 'Profile already exists for this user.'
	})
	create(@CurrentUser('id') userId: string, @Body() dto: UserProfileDto) {
		return this.userProfileService.create(userId, dto)
	}

	@Get('me')
	@ApiOperation({ summary: 'Get current user profile' })
	@ApiOkResponse({
		description: 'Profile found and returned successfully.'
	})
	@ApiNotFoundResponse({
		description: 'Profile not found.'
	})
	getProfile(@CurrentUser('id') userId: string) {
		return this.userProfileService.findByUserId(userId)
	}
}
