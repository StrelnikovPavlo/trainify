import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateEquipmentDto } from './dto/create-equipment.dto'
import { UpdateEquipmentDto } from './dto/update-equipment.dto'
import { EquipmentService } from './equipment.service'

@ApiTags('Equipment')
@Controller('equipment')
export class EquipmentController {
	constructor(private readonly equipmentService: EquipmentService) {}

	@Get()
	@ApiOperation({ summary: 'Get a list of equipment' })
	@ApiResponse({
		status: 200,
		description: 'Equipment list retrieved successfully'
	})
	findMany() {
		return this.equipmentService.findMany()
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get equipment by id' })
	@ApiParam({ name: 'id', description: 'Equipment identifier' })
	@ApiResponse({ status: 200, description: 'Equipment found' })
	@ApiResponse({ status: 404, description: 'Equipment not found' })
	findById(@Param('id') id: string) {
		return this.equipmentService.findById(id)
	}

	@Post()
	@ApiOperation({ summary: 'Create new equipment' })
	@ApiResponse({ status: 201, description: 'Equipment created successfully' })
	create(@Body() dto: CreateEquipmentDto) {
		return this.equipmentService.create(dto)
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update equipment by id' })
	@ApiParam({ name: 'id', description: 'Equipment identifier' })
	@ApiResponse({ status: 200, description: 'Equipment updated successfully' })
	@ApiResponse({ status: 404, description: 'Equipment not found' })
	update(@Param('id') id: string, @Body() dto: UpdateEquipmentDto) {
		return this.equipmentService.update(id, dto)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete equipment by id' })
	@ApiParam({ name: 'id', description: 'Equipment identifier' })
	@ApiResponse({ status: 200, description: 'Equipment deleted successfully' })
	@ApiResponse({ status: 404, description: 'Equipment not found' })
	delete(@Param('id') id: string) {
		return this.equipmentService.delete(id)
	}
}
