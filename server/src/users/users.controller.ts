import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'
import { Roles } from '@/auth/decorators/roles.decorator'
import { Role } from 'prisma/generated/prisma/enums'

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiCreatedResponse({
		description: 'The user has been successfully created.'
	})
	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.usersService.create(dto)
	}

	@Roles(Role.ADMIN, Role.MODERATOR)
	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({ description: 'List of users retrieved successfully.' })
	@Get()
	findMany() {
		return this.usersService.findMany()
	}

	@ApiOperation({ summary: 'Get user' })
	@ApiOkResponse({ description: 'User found successfully.' })
	@Get(':id')
	findById(@Param('id') id: string) {
		return this.usersService.findById(id)
	}

	@ApiOperation({ summary: 'Update data user' })
	@ApiOkResponse({ description: 'User data updated successfully.' })
	@Put(':id')
	update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.usersService.update(id, dto)
	}

	@Roles(Role.ADMIN)
	@ApiOperation({ summary: 'Remove user' })
	@ApiOkResponse({ description: 'User deleted successfully.' })
	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.usersService.delete(id)
	}
}
