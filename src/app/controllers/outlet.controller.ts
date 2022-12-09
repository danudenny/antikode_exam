import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  Param,
  Delete,
  Patch, UploadedFile
} from "@nestjs/common";
import {
  ApiBadRequestResponse, ApiBody, ApiConsumes,
  ApiOkResponse,
  ApiOperation, ApiParam,
  ApiTags
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from "multer";
import { OutletResponse, OutletWithPaginationResponse } from "../domains/outlet/outlet.response";
import { OutletService } from "../services/outlet.service";
import { OutletQuery } from "../domains/outlet/outlet.query";
import { OutletCreateDto } from "../domains/outlet/outlet-create.dto";
import { OutletUpdateDto } from "../domains/outlet/outlet-update.dto";

let pictureImg = ""
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: "kemang"
        },
        picture: {
          type: 'string',
          format: 'binary',
        },
        address: {
          type: 'string',
          example: "jakarta"
        },
        longitude: {
          type: 'string',
          example: "106.816666"
        },
        latitude: {
          type: 'string',
          example: "-6.200000"
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('picture', {
    storage: diskStorage({
      destination: './public/upload/outlet',
      filename: (req, picture, cb) => {
        let trimName = picture.originalname.split(".")
        let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
        let fileName = `${randomName}${extname(picture.originalname)}`
        cb(null, fileName)
      }
    })
  }))
  public async create(
    @UploadedFile() picture: Express.Multer.File,
    @Body() payload: OutletCreateDto
  ) {
    if (picture != null) {
      let trimName = picture.originalname.split(".")
      let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
      pictureImg = `${randomName}${extname(picture.originalname)}`
    }

    return this.outSvc.create({
      name: payload.name,
      picture: pictureImg,
      address: payload.address,
      longitude: payload.longitude,
      latitude: payload.latitude,
    })
  }

  @Get('show/:id')
  @ApiParam({name: 'id'})
  @ApiOperation({ summary: 'get outlet by ID' })
  @ApiOkResponse({ type: OutletResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async getById(@Param() id: number) {
    return await this.outSvc.findById(id);
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: "kemang"
        },
        picture: {
          type: 'string',
          format: 'binary',
        },
        address: {
          type: 'string',
          example: "jakarta"
        },
        longitude: {
          type: 'string',
          example: "106.816666"
        },
        latitude: {
          type: 'string',
          example: "-6.200000"
        },
      },
    },
  })
  @ApiParam({name: 'id', type: 'number'})
  @UseInterceptors(FileInterceptor('picture', {
    storage: diskStorage({
      destination: './public/upload/outlet',
      filename: (req, picture, cb) => {
        let trimName = picture.originalname.split(".")
        let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
        let fileName = `${randomName}${extname(picture.originalname)}`
        cb(null, fileName)
      }
    })
  }))
  @ApiOperation({ summary: 'Update Outlet' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async update(
    @UploadedFile() pictures: Express.Multer.File,
    @Body() payload: OutletUpdateDto,
    @Param('id') id: number
  ) {
    if (pictures != null) {
      let trimName = pictures.originalname.split(".")
      let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
      pictureImg = `${randomName}${extname(pictures.originalname)}`
    }

    return this.outSvc.update({
      name: payload.name,
      picture: pictureImg,
      address: payload.address,
      longitude: payload.longitude,
      latitude: payload.latitude,
    }, id)
  }

  @Delete('delete/:id')
  @ApiParam({name: 'id'})
  @ApiOperation({ summary: 'Delete Outlet by ID' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async delete(@Param() id: number) {
    return await this.outSvc.delete(id);
  }

}
