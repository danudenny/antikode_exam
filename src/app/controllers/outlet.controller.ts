import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  Param,
  Delete,
  Patch,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  OutletResponse,
  OutletWithPaginationResponse,
} from '../domains/outlet/outlet.response';
import { OutletService } from '../services/outlet.service';
import { OutletQuery } from '../domains/outlet/outlet.query';
import { OutletCreateDto } from '../domains/outlet/outlet-create.dto';
import { OutletUpdateDto } from '../domains/outlet/outlet-update.dto';

@Controller('outlets')
@ApiTags('Outlet')
export class OutletController {
  constructor(private outSvc: OutletService) {}

  @Get()
  @ApiOperation({ summary: 'List all Outlets' })
  @ApiOkResponse({ type: OutletWithPaginationResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async list(@Query() query: OutletQuery) {
    return await this.outSvc.getList(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a Outlet' })
  @ApiOkResponse({ type: OutletResponse })
  @ApiBody({ type: OutletCreateDto })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  public async create(@UploadedFiles() file, @Body() payload: OutletCreateDto) {
    await this.outSvc.create({
      name: payload.name,
      picture: file ? file.picture : null,
      address: payload.address,
      longitude: payload.longitude,
      latitude: payload.latitude,
      brand: payload.brand,
    });

    return {
      message: 'success create outlet',
    };
  }

  @Get('show/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'get outlet by ID' })
  @ApiOkResponse({ type: OutletResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async getById(@Param() id: number) {
    return await this.outSvc.findById(id);
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: OutletUpdateDto })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Update Outlet' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  public async update(
    @UploadedFiles() file,
    @Body() payload: OutletUpdateDto,
    @Param('id') id: number,
  ) {
    await this.outSvc.update(
      {
        name: payload.name,
        picture: file ? file.picture : null,
        address: payload.address,
        longitude: payload.longitude,
        latitude: payload.latitude,
        brand: payload.brand,
      },
      id,
    );

    return {
      message: 'success update outlet',
      id: id,
    };
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete Outlet by ID' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async delete(@Param() id: number) {
    return await this.outSvc.delete(id);
  }
}
