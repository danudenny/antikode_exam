import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
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
import { ProductService } from '../services/product.service';
import { ProductQuery } from '../domains/product/product.query';
import {
  ProductResponse,
  ProductWithPaginationResponse,
} from '../domains/product/product.response';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProductCreateDto } from '../domains/product/product-create.dto';
import { ProductUpdateDto } from '../domains/product/product-update.dto';

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
  @ApiBody({ type: ProductCreateDto })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  public async create(
    @UploadedFiles() file,
    @Body() payload: ProductCreateDto,
  ) {
    await this.prodSvc.create({
      name: payload.name,
      picture: file ? file.picture : null,
      price: payload.price,
      brand: payload.brand,
    });

    return {
      message: 'success create product',
    };
  }

  @Get('show/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'get product by ID' })
  @ApiOkResponse({ type: ProductResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async getById(@Param() id: number) {
    return await this.prodSvc.findById(id);
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ProductUpdateDto })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Update Product' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  public async update(
    @UploadedFiles() file,
    @Body() payload: ProductUpdateDto,
    @Param('id') id: number,
  ) {
    return this.prodSvc.update(
      {
        name: payload.name,
        picture: file ? file.picture : null,
        price: payload.price,
        brand: payload.brand,
      },
      id,
    );
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete Product by ID' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async delete(@Param() id: number) {
    return await this.prodSvc.delete(id);
  }
}
