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
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto'
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto'
import { MuscleGroupService } from './muscle-group.service'

@ApiBearerAuth()
@ApiTags('Muscle Groups')
@Controller(ROUTES.muscleGroup.base)
export class MuscleGroupController {
	constructor(private readonly muscleGroupService: MuscleGroupService) {}

	@ApiOperation({ summary: 'Get all muscle groups' })
	@ApiOkResponse({ description: 'List of muscle groups returned successfully' })
	@Get()
	findMany() {
		return this.muscleGroupService.findMany()
	}

	@ApiOperation({ summary: 'Get muscle group by ID' })
	@ApiParam({
		name: 'id',
		description: 'Muscle group ID',
		example: 'cku1122334455'
	})
	@ApiOkResponse({ description: 'Muscle group found and returned' })
	@ApiNotFoundResponse({
		description: 'Muscle group with the given ID was not found'
	})
	@Get(ROUTES.muscleGroup.byId)
	findById(@Param('id') id: string) {
		return this.muscleGroupService.findById(id)
	}

	@ApiOperation({ summary: 'Create a muscle group' })
	@ApiCreatedResponse({ description: 'Muscle group successfully created' })
	@ApiConflictResponse({
		description: 'A muscle group with this name already exists'
	})
	@Post()
	create(@Body() dto: CreateMuscleGroupDto) {
		return this.muscleGroupService.create(dto)
	}

	@ApiOperation({ summary: 'Update a muscle group' })
	@ApiParam({
		name: 'id',
		description: 'Muscle group ID',
		example: 'cku1122334455'
	})
	@ApiOkResponse({ description: 'Muscle group successfully updated' })
	@ApiNotFoundResponse({
		description: 'Muscle group with the given ID was not found'
	})
	@Put(ROUTES.muscleGroup.byId)
	update(@Param('id') id: string, @Body() dto: UpdateMuscleGroupDto) {
		return this.muscleGroupService.update(id, dto)
	}

	@ApiOperation({ summary: 'Delete a muscle group' })
	@ApiOkResponse({ description: 'Muscle group successfully deleted' })
	@ApiNotFoundResponse({
		description: 'Muscle group with the given ID was not found'
	})
	@Delete(ROUTES.muscleGroup.byId)
	delete(@Param('id') id: string) {
		return this.muscleGroupService.delete(id)
	}
}
