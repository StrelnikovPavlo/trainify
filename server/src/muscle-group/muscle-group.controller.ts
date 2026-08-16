import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto'
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto'
import { MuscleGroupService } from './muscle-group.service'

@ApiBearerAuth()
@ApiTags('Muscle Groups')
@Controller(ROUTES.muscleGroup.base)
export class MuscleGroupController {
	constructor(private readonly muscleGroupService: MuscleGroupService) {}

	@ApiOperation({ summary: 'Get all muscle groups' })
	@Get()
	findMany() {
		return this.muscleGroupService.findMany()
	}

	@ApiOperation({ summary: 'Get muscle group by ID' })
	@Get(ROUTES.muscleGroup.byId)
	findById(@Param('id') id: string) {
		return this.muscleGroupService.findById(id)
	}

	@ApiOperation({ summary: 'Create a muscle group' })
	@Post()
	create(@Body() dto: CreateMuscleGroupDto) {
		return this.muscleGroupService.create(dto)
	}

	@ApiOperation({ summary: 'Update a muscle group' })
	@Put(ROUTES.muscleGroup.byId)
	update(@Param('id') id: string, @Body() dto: UpdateMuscleGroupDto) {
		return this.muscleGroupService.update(id, dto)
	}

	@ApiOperation({ summary: 'Delete a muscle group' })
	@Delete(ROUTES.muscleGroup.byId)
	delete(@Param('id') id: string) {
		return this.muscleGroupService.delete(id)
	}
}
