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
import { CreateEquipmentDto } from './dto/create-equipment.dto'
import { UpdateEquipmentDto } from './dto/update-equipment.dto'
import { EquipmentService } from './equipment.service'

@ApiBearerAuth()
@ApiTags('Equipment')
@Controller(ROUTES.equipment.base)
export class EquipmentController {
	constructor(private readonly equipmentService: EquipmentService) {}

	@ApiOperation({ summary: 'Get a list of equipment' })
	@ApiOkResponse({ description: 'List of equipment returned successfully' })
	@Get()
	findMany() {
		return this.equipmentService.findMany()
	}

	@ApiOperation({ summary: 'Get equipment by id' })
	@ApiParam({
		name: 'id',
		description: 'Equipment ID',
		example: 'cku1122334455'
	})
	@ApiOkResponse({ description: 'Equipment found and returned' })
	@ApiNotFoundResponse({
		description: 'Equipment with the given ID was not found'
	})
	@Get(ROUTES.equipment.byId)
	findById(@Param('id') id: string) {
		return this.equipmentService.findById(id)
	}

	@ApiOperation({ summary: 'Create new equipment' })
	@ApiCreatedResponse({ description: 'Equipment successfully created' })
	@ApiConflictResponse({
		description: 'Equipment with this name already exists'
	})
	@Post()
	create(@Body() dto: CreateEquipmentDto) {
		return this.equipmentService.create(dto)
	}

	@ApiOperation({ summary: 'Update equipment by id' })
	@ApiParam({
		name: 'id',
		description: 'Equipment ID',
		example: 'cku1122334455'
	})
	@ApiOkResponse({ description: 'Equipment successfully updated' })
	@ApiNotFoundResponse({
		description: 'Equipment with the given ID was not found'
	})
	@Put(ROUTES.equipment.byId)
	update(@Param('id') id: string, @Body() dto: UpdateEquipmentDto) {
		return this.equipmentService.update(id, dto)
	}

	@ApiOperation({ summary: 'Delete equipment by id' })
	@ApiParam({
		name: 'id',
		description: 'Equipment ID',
		example: 'cku1122334455'
	})
	@ApiOkResponse({ description: 'Equipment successfully deleted' })
	@ApiNotFoundResponse({
		description: 'Equipment with the given ID was not found'
	})
	@Delete(ROUTES.equipment.byId)
	delete(@Param('id') id: string) {
		return this.equipmentService.delete(id)
	}
}
