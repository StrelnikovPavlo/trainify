import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { ExercisesService } from './exercises.service'

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
	constructor(private readonly exercisesService: ExercisesService) {}

	@Get()
	@ApiOperation({ summary: 'Get a list of exercises' })
	@ApiResponse({
		status: 200,
		description: 'Exercise list retrieved successfully'
	})
	findMany() {
		return this.exercisesService.findMany()
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get exercise by id' })
	@ApiParam({ name: 'id', description: 'Exercise identifier' })
	@ApiResponse({ status: 200, description: 'Exercise found' })
	@ApiResponse({ status: 404, description: 'Exercise not found' })
	findById(@Param('id') id: string) {
		return this.exercisesService.findById(id)
	}

	@Post()
	@ApiOperation({ summary: 'Create new exercise' })
	@ApiResponse({ status: 201, description: 'Exercise created successfully' })
	create(@Body() dto: CreateExerciseDto) {
		return this.exercisesService.create(dto)
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update exercise by id' })
	@ApiParam({ name: 'id', description: 'Exercise identifier' })
	@ApiResponse({ status: 200, description: 'Exercise updated successfully' })
	@ApiResponse({ status: 404, description: 'Exercise not found' })
	update(@Param('id') id: string, @Body() dto: UpdateExerciseDto) {
		return this.exercisesService.update(id, dto)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete exercise by id' })
	@ApiParam({ name: 'id', description: 'Exercise identifier' })
	@ApiResponse({ status: 200, description: 'Exercise deleted successfully' })
	@ApiResponse({ status: 404, description: 'Exercise not found' })
	delete(@Param('id') id: string) {
		return this.exercisesService.delete(id)
	}
}
