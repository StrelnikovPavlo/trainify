import { Public } from '@/auth/decorators/public.decorator'
import { Roles } from '@/auth/decorators/roles.decorator'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { Role } from 'prisma/generated/prisma/enums'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Public()
	@Post()
	@ApiOperation({ summary: 'Create user' })
	@ApiCreatedResponse({
		description: 'The user has been successfully created.'
	})
	create(@Body() dto: CreateUserDto) {
		return this.usersService.create(dto)
	}

	@Roles(Role.ADMIN, Role.MODERATOR)
	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({ description: 'List of users retrieved successfully.' })
	findMany() {
		return this.usersService.findMany()
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user' })
	@ApiOkResponse({ description: 'User found successfully.' })
	findById(@Param('id') id: string) {
		return this.usersService.findById(id)
	}

	@Public()
	@Put(':id')
	@ApiOperation({ summary: 'Update data user' })
	@ApiOkResponse({ description: 'User data updated successfully.' })
	update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.usersService.update(id, dto)
	}

	@Roles(Role.ADMIN)
	@Delete(':id')
	@ApiOperation({ summary: 'Remove user' })
	@ApiOkResponse({ description: 'User deleted successfully.' })
	delete(@Param('id') id: string) {
		return this.usersService.delete(id)
	}
}
