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
  Patch
} from "@nestjs/common";
import {
  ApiBadRequestResponse, ApiBody, ApiConsumes,
  ApiOkResponse,
  ApiOperation, ApiParam,
  ApiTags
} from "@nestjs/swagger";
import { BrandService } from "../services/brand.service";
import { BrandResponse, BrandWithPaginationResponse } from "../domains/brand/brand.response";
import { BrandQuery } from "../domains/brand/brand.query";
import { BrandCreateDTO } from "../domains/brand/brand-create.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from "multer";
import { BrandUpdateDTO } from "../domains/brand/brand-update.dto";

let logoImg = ""
let bannerImg = ""
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        logo: {
          type: 'string',
          format: 'binary',
        },
        banner: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
  ], {
    storage: diskStorage({
      destination: './public/upload',
      filename: (req, files, cb) => {
        let trimName = files.originalname.split(".")
        let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
        let fileName = `${randomName}${extname(files.originalname)}`
        cb(null, fileName)
      }
    })
  }))
  public async create(
    @UploadedFiles() files,
    @Body() payload: BrandCreateDTO
  ) {
    files.logo.map((e: Express.Multer.File) => {
      let trimName = e.originalname.split(".")
      let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
      logoImg = `${randomName}${extname(e.originalname)}`
    })
    files.banner.map((e: Express.Multer.File) => {
      let trimName = e.originalname.split(".")
      let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
      bannerImg = `${randomName}${extname(e.originalname)}`
    })

    return this.brndSvc.create({
      name: payload.name,
      logo: logoImg,
      banner: bannerImg,
    })
  }

  @Get('show/:id')
  @ApiParam({name: 'id'})
  @ApiOperation({ summary: 'get Brand by ID' })
  @ApiOkResponse({ type: BrandResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async getById(@Param() id: number) {
    return await this.brndSvc.findById(id);
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        logo: {
          type: 'string',
          format: 'binary',
        },
        banner: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({name: 'id', type: 'number'})
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
  ], {
    storage: diskStorage({
      destination: './public/upload',
      filename: (req, files, cb) => {
        let trimName = files.originalname.split(".")
        let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
        let fileName = `${randomName}${extname(files.originalname)}`
        cb(null, fileName)
      }
    })
  }))
  @ApiOperation({ summary: 'Update Brand' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async update(
    @UploadedFiles() files,
    @Body() payload: BrandUpdateDTO,
    @Param('id') id: number
  ) {
    if (files.logo != null) {
      files.logo.map((e: Express.Multer.File) => {
        let trimName = e.originalname.split(".")
        let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
        logoImg = `${randomName}${extname(e.originalname)}`
      })
    }

    if (files.banner != null) {
      files.banner.map((e: Express.Multer.File) => {
        let trimName = e.originalname.split(".")
        let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
        bannerImg = `${randomName}${extname(e.originalname)}`
      })
    }

    return this.brndSvc.update({
      name: payload.name,
      logo: logoImg,
      banner: bannerImg,
    }, id)
  }

  @Delete('delete/:id')
  @ApiParam({name: 'id'})
  @ApiOperation({ summary: 'Delete Brand by ID' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async delete(@Param() id: number) {
    return await this.brndSvc.delete(id);
  }

}
