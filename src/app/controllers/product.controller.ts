import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from "@nestjs/swagger";
import { ProductService } from "../services/product.service";
import { ProductQuery } from "../domains/product/product.query";
import { ProductResponse, ProductWithPaginationResponse } from "../domains/product/product.response";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ProductCreateDto } from "../domains/product/product-create.dto";
import { ProductUpdateDto } from "../domains/product/product-update.dto";

let pictureImg = ""

@Controller('products')
@ApiTags('Product')
export class ProductController {
  constructor(private prodSvc: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'List all Products' })
  @ApiOkResponse({ type: ProductWithPaginationResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async list(@Query() query: ProductQuery) {
    return await this.prodSvc.getList(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a Product' })
  @ApiOkResponse({ type: ProductResponse })
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
        price: {
          type: 'number',
          example: 1000000
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('picture', {
    storage: diskStorage({
      destination: './public/upload/product',
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
    @Body() payload: ProductCreateDto
  ) {
    if (picture != null) {
      let trimName = picture.originalname.split(".")
      let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
      pictureImg = `${randomName}${extname(picture.originalname)}`
    }

    return this.prodSvc.create({
      name: payload.name,
      picture: pictureImg,
      price: payload.price,
    })
  }

  @Get('show/:id')
  @ApiParam({name: 'id'})
  @ApiOperation({ summary: 'get product by ID' })
  @ApiOkResponse({ type: ProductResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async getById(@Param() id: number) {
    return await this.prodSvc.findById(id);
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
        price: {
          type: 'number',
          example: 1000000
        },
      },
    },
  })
  @ApiParam({name: 'id', type: 'number'})
  @UseInterceptors(FileInterceptor('picture', {
    storage: diskStorage({
      destination: './public/upload/product',
      filename: (req, picture, cb) => {
        let trimName = picture.originalname.split(".")
        let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
        let fileName = `${randomName}${extname(picture.originalname)}`
        cb(null, fileName)
      }
    })
  }))
  @ApiOperation({ summary: 'Update Product' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async update(
    @UploadedFile() pictures: Express.Multer.File,
    @Body() payload: ProductUpdateDto,
    @Param('id') id: number
  ) {
    if (pictures != null) {
      let trimName = pictures.originalname.split(".")
      let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`
      pictureImg = `${randomName}${extname(pictures.originalname)}`
    }

    return this.prodSvc.update({
      name: payload.name,
      picture: pictureImg,
      price: payload.price,
    }, id)
  }

  @Delete('delete/:id')
  @ApiParam({name: 'id'})
  @ApiOperation({ summary: 'Delete Product by ID' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async delete(@Param() id: number) {
    return await this.prodSvc.delete(id);
  }

}