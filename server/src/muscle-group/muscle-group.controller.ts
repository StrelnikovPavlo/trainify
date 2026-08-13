import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto'
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto'
import { MuscleGroupService } from './muscle-group.service'

@ApiTags('Muscle Groups')
@Controller('muscle-group')
export class MuscleGroupController {
	constructor(private readonly muscleGroupService: MuscleGroupService) {}

	@Get()
	@ApiOperation({ summary: 'Get all muscle groups' })
	@ApiResponse({
		status: 200,
		description: 'List of muscle groups returned successfully.'
	})
	findMany() {
		return this.muscleGroupService.findMany()
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get muscle group by ID' })
	@ApiParam({
		name: 'id',
		description: 'Muscle group ID',
		example: 'clx123abc456'
	})
	@ApiResponse({
		status: 200,
		description: 'Muscle group returned successfully.'
	})
	@ApiResponse({
		status: 404,
		description: 'Muscle group not found.'
	})
	findById(@Param('id') id: string) {
		return this.muscleGroupService.findById(id)
	}

	@Post()
	@ApiOperation({ summary: 'Create a muscle group' })
	@ApiBody({
		type: CreateMuscleGroupDto
	})
	@ApiResponse({
		status: 201,
		description: 'Muscle group created successfully.'
	})
	@ApiResponse({
		status: 409,
		description: 'Muscle group with this name already exists.'
	})
	create(@Body() dto: CreateMuscleGroupDto) {
		return this.muscleGroupService.create(dto)
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a muscle group' })
	@ApiParam({
		name: 'id',
		description: 'Muscle group ID',
		example: 'clx123abc456'
	})
	@ApiBody({
		type: UpdateMuscleGroupDto
	})
	@ApiResponse({
		status: 200,
		description: 'Muscle group updated successfully.'
	})
	@ApiResponse({
		status: 404,
		description: 'Muscle group not found.'
	})
	@ApiResponse({
		status: 409,
		description: 'Muscle group with this name already exists.'
	})
	update(@Param('id') id: string, @Body() dto: UpdateMuscleGroupDto) {
		return this.muscleGroupService.update(id, dto)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a muscle group' })
	@ApiParam({
		name: 'id',
		description: 'Muscle group ID',
		example: 'clx123abc456'
	})
	@ApiResponse({
		status: 200,
		description: 'Muscle group deleted successfully.'
	})
	@ApiResponse({
		status: 404,
		description: 'Muscle group not found.'
	})
	delete(@Param('id') id: string) {
		return this.muscleGroupService.delete(id)
	}
}
