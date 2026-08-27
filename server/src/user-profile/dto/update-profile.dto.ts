import { PartialType } from '@nestjs/swagger'
import { UserProfileDto } from './create-profile.dto'

export class UpdateUserProfileDto extends PartialType(UserProfileDto) {}
