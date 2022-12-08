import { Body, Controller, Get, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import {
  ApiBadRequestResponse, ApiBody, ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { BrandService } from "../services/brand.service";
import { BrandResponse, BrandWithPaginationResponse } from "../domains/brand/brand.response";
import { BrandQuery } from "../domains/brand/brand.query";
import { BrandCreateDTO } from "../domains/brand/brand-create.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from "multer";

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
  public async upload(
    @UploadedFiles() files,
    @Body() payload: BrandCreateDTO
  ) {
    let logoImg = ""
    let bannerImg = ""
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
}
