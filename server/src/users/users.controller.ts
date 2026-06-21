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

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({ summary: 'Create user' })
	@ApiCreatedResponse({
		description: 'The user has been successfully created.'
	})
	create(@Body() dto: CreateUserDto) {
		return this.usersService.create(dto)
	}

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

	@Put(':id')
	@ApiOperation({ summary: 'Update data user' })
	@ApiOkResponse({ description: 'User data updated successfully.' })
	update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.usersService.update(id, dto)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Remove user' })
	@ApiOkResponse({ description: 'User deleted successfully.' })
	delete(@Param('id') id: string) {
		return this.usersService.delete(id)
	}
}
