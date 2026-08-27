import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { UserProfileDto } from './dto/create-profile.dto'
import { UpdateUserProfileDto } from './dto/update-profile.dto'
import { UserProfileRepository } from './user-profile.repository'

@Injectable()
export class UserProfileService {
	constructor(private readonly userProfileRepository: UserProfileRepository) {}

	async create(userId: string, dto: UserProfileDto) {
		const exist = await this.userProfileRepository.findById(userId)
		if (exist) {
			throw new ConflictException('Profile already exists')
		}

		return this.userProfileRepository.create(userId, dto)
	}

	async update(userId: string, dto: UpdateUserProfileDto) {
		const user = await this.userProfileRepository.findById(userId)

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return this.userProfileRepository.update(userId, dto)
	}

	async findByUserId(userId: string) {
		const profile = await this.userProfileRepository.findById(userId)
		if (!profile) {
			throw new NotFoundException('Profile not found')
		}

		return profile
	}
}
