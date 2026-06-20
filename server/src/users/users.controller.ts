import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import {
	ApiCreatedResponse,
	ApiNoContentResponse,
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
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({ description: 'List of users retrieved successfully.' })
	findAll() {
		return this.usersService.findAll()
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user' })
	@ApiOkResponse({ description: 'User found successfully.' })
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id)
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update data user' })
	@ApiOkResponse({ description: 'User data updated successfully.' })
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto)
	}

	@ApiOperation({ summary: 'Remove user' })
	@ApiNoContentResponse({ description: 'User deleted successfully.' })
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id)
	}
}
