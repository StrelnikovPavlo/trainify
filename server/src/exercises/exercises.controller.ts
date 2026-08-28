import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { ExercisesService } from './exercises.service'

@ApiBearerAuth()
@ApiTags('Exercises')
@Controller(ROUTES.exercises.base)
export class ExercisesController {
	constructor(private readonly exercisesService: ExercisesService) {}

	@ApiOperation({ summary: 'Get a list of exercises' })
	@ApiOkResponse({ description: 'List of exercises returned successfully' })
	@Get()
	findMany() {
		return this.exercisesService.findMany()
	}

	@ApiOperation({ summary: 'Get exercise by id' })
	@ApiParam({
		name: 'id',
		description: 'Exercise ID',
		example: 'cku1122334455'
	})
	@ApiOkResponse({ description: 'Exercise found and returned' })
	@ApiNotFoundResponse({
		description: 'Exercise with the given ID was not found'
	})
	@Get(ROUTES.exercises.byId)
	findById(@Param('id') id: string) {
		return this.exercisesService.findById(id)
	}

	@ApiOperation({ summary: 'Create new exercise' })
	@ApiCreatedResponse({ description: 'Exercise successfully created' })
	@Post()
	create(@Body() dto: CreateExerciseDto) {
		return this.exercisesService.create(dto)
	}

	@ApiOperation({ summary: 'Update exercise by id' })
	@ApiParam({
		name: 'id',
		description: 'Exercise ID',
		example: 'cku1122334455'
	})
	@ApiOkResponse({ description: 'Exercise successfully updated' })
	@ApiNotFoundResponse({
		description: 'Exercise with the given ID was not found'
	})
	@Put(ROUTES.exercises.byId)
	update(@Param('id') id: string, @Body() dto: UpdateExerciseDto) {
		return this.exercisesService.update(id, dto)
	}

	@ApiOperation({ summary: 'Delete exercise by id' })
	@ApiParam({
		name: 'id',
		description: 'Exercise ID',
		example: 'cku1122334455'
	})
	@ApiOkResponse({ description: 'Exercise successfully deleted' })
	@ApiNotFoundResponse({
		description: 'Exercise with the given ID was not found'
	})
	@Delete(ROUTES.exercises.byId)
	delete(@Param('id') id: string) {
		return this.exercisesService.delete(id)
	}
}
