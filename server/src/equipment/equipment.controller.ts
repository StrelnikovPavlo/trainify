import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateEquipmentDto } from './dto/create-equipment.dto'
import { UpdateEquipmentDto } from './dto/update-equipment.dto'
import { EquipmentService } from './equipment.service'

@ApiBearerAuth()
@ApiTags('Equipment')
@Controller(ROUTES.equipment.base)
export class EquipmentController {
	constructor(private readonly equipmentService: EquipmentService) {}

	@ApiOperation({ summary: 'Get a list of equipment' })
	@Get()
	findMany() {
		return this.equipmentService.findMany()
	}

	@ApiOperation({ summary: 'Get equipment by id' })
	@Get(ROUTES.equipment.byId)
	findById(@Param('id') id: string) {
		return this.equipmentService.findById(id)
	}

	@ApiOperation({ summary: 'Create new equipment' })
	@Post()
	create(@Body() dto: CreateEquipmentDto) {
		return this.equipmentService.create(dto)
	}

	@ApiOperation({ summary: 'Update equipment by id' })
	@Put(ROUTES.equipment.byId)
	update(@Param('id') id: string, @Body() dto: UpdateEquipmentDto) {
		return this.equipmentService.update(id, dto)
	}

	@ApiOperation({ summary: 'Delete equipment by id' })
	@Delete(ROUTES.equipment.byId)
	delete(@Param('id') id: string) {
		return this.equipmentService.delete(id)
	}
}
