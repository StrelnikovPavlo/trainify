import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { ExercisesService } from './exercises.service'

@ApiBearerAuth()
@ApiTags('Exercises')
@Controller(ROUTES.exercises.base)
export class ExercisesController {
	constructor(private readonly exercisesService: ExercisesService) {}

	@ApiOperation({ summary: 'Get a list of exercises' })
	@Get()
	findMany() {
		return this.exercisesService.findMany()
	}

	@ApiOperation({ summary: 'Get exercise by id' })
	@Get(ROUTES.exercises.byId)
	findById(@Param('id') id: string) {
		return this.exercisesService.findById(id)
	}

	@ApiOperation({ summary: 'Create new exercise' })
	@Post()
	create(@Body() dto: CreateExerciseDto) {
		return this.exercisesService.create(dto)
	}

	@ApiOperation({ summary: 'Update exercise by id' })
	@Put(ROUTES.exercises.byId)
	update(@Param('id') id: string, @Body() dto: UpdateExerciseDto) {
		return this.exercisesService.update(id, dto)
	}

	@ApiOperation({ summary: 'Delete exercise by id' })
	@Delete(ROUTES.exercises.byId)
	delete(@Param('id') id: string) {
		return this.exercisesService.delete(id)
	}
}
