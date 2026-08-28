import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiBearerAuth()
@ApiTags('Users')
@Controller(ROUTES.users.base)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiCreatedResponse({ description: 'User successfully created' })
	@ApiConflictResponse({ description: 'A user with this email already exists' })
	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.usersService.create(dto)
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({ description: 'List of users returned successfully' })
	@Get()
	findMany() {
		return this.usersService.findMany()
	}

	@ApiOperation({ summary: 'Get user' })
	@ApiParam({
		name: 'id',
		description: 'User ID',
		example: 'clx1y2z3a0000abcd1234efgh'
	})
	@ApiOkResponse({ description: 'User found and returned' })
	@ApiNotFoundResponse({ description: 'User with the given ID was not found' })
	@Get(ROUTES.users.byId)
	findById(@Param('id') id: string) {
		return this.usersService.findById(id)
	}

	@ApiOperation({ summary: 'Update data user' })
	@ApiParam({
		name: 'id',
		description: 'User ID',
		example: 'clx1y2z3a0000abcd1234efgh'
	})
	@ApiOkResponse({ description: 'User successfully updated' })
	@ApiNotFoundResponse({ description: 'User with the given ID was not found' })
	@Put(ROUTES.users.byId)
	update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.usersService.update(id, dto)
	}

	@ApiOperation({ summary: 'Remove user' })
	@Delete(ROUTES.users.byId)
	@ApiParam({
		name: 'id',
		description: 'User ID',
		example: 'clx1y2z3a0000abcd1234efgh'
	})
	@ApiOkResponse({ description: 'User successfully deleted' })
	@ApiNotFoundResponse({ description: 'User with the given ID was not found' })
	delete(@Param('id') id: string) {
		return this.usersService.delete(id)
	}
}
