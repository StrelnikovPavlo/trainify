import { Roles } from '@/auth/decorators/roles.decorator'
import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Role } from 'prisma/generated/prisma/enums'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiBearerAuth()
@ApiTags('Users')
@Controller(ROUTES.users.base)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.usersService.create(dto)
	}

	//@Roles(Role.ADMIN, Role.MODERATOR)
	@ApiOperation({ summary: 'Get all users' })
	@Get()
	findMany() {
		return this.usersService.findMany()
	}

	@ApiOperation({ summary: 'Get user' })
	@Get(ROUTES.users.byId)
	findById(@Param('id') id: string) {
		return this.usersService.findById(id)
	}

	@ApiOperation({ summary: 'Update data user' })
	@Put(ROUTES.users.byId)
	update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.usersService.update(id, dto)
	}

	@Roles(Role.ADMIN)
	@ApiOperation({ summary: 'Remove user' })
	@Delete(ROUTES.users.byId)
	delete(@Param('id') id: string) {
		return this.usersService.delete(id)
	}
}
