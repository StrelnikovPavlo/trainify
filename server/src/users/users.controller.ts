import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 200 })
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200 })
	findAll() {
		return this.usersService.findAll()
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user' })
	@ApiResponse({ status: 200 })
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id)
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update data user' })
	@ApiResponse({ status: 200 })
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto)
	}

	@ApiOperation({ summary: 'Remove user' })
	@ApiResponse({ status: 200 })
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id)
	}
}
