import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  Param,
  Delete,
  Patch,
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
import { BrandService } from '../services/brand.service';
import {
  BrandResponse,
  BrandWithPaginationResponse,
} from '../domains/brand/brand.response';
import { BrandQuery } from '../domains/brand/brand.query';
import { BrandCreateDTO } from '../domains/brand/brand-create.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { BrandUpdateDTO } from '../domains/brand/brand-update.dto';

@Controller('brands')
@ApiTags('Brands')
export class BrandController {
  constructor(private brndSvc: BrandService) {}

  @Get()
  @ApiOperation({ summary: 'List all Brands' })
  @ApiOkResponse({ type: BrandWithPaginationResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async list(@Query() query: BrandQuery) {
    return await this.brndSvc.list(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a Brand' })
  @ApiOkResponse({ type: BrandResponse })
  @ApiBody({ type: BrandCreateDTO })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  public async create(
    @UploadedFiles() files,
    @Body()
    payload: BrandCreateDTO,
  ) {
    await this.brndSvc.create({
      name: payload.name,
      logo: files ? files.logo : null,
      banner: files ? files.banner : null,
    });

    return {
      message: 'success create new brand',
    };
  }

  @Get('show/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'get Brand by ID' })
  @ApiOkResponse({ type: BrandResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async getById(@Param() id: number) {
    return await this.brndSvc.findById(id);
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: BrandUpdateDTO })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Update Brand' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async update(
    @UploadedFiles() files,
    @Body() payload: BrandUpdateDTO,
    @Param('id') id: number,
  ) {
    await this.brndSvc.update(
      {
        name: payload.name,
        logo: files ? files.logo : null,
        banner: files ? files.banner : null,
      },
      id,
    );

    return {
      message: 'success update brand',
    };
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete Brand by ID' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async delete(@Param() id: number) {
    return await this.brndSvc.delete(id);
  }
}
