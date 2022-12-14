import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../models/product.entity';
import { Repository } from 'typeorm';
import {
  ProductResponse,
  ProductWithPaginationResponse,
} from '../domains/product/product.response';
import { ProductQuery } from '../domains/product/product.query';
import { QueryBuilder } from 'typeorm-query-builder-wrapper';
import { ProductCreateDto } from '../domains/product/product-create.dto';
import { ProductUpdateDto } from '../domains/product/product-update.dto';
import { UploadFile } from '../../utils/upload-file';
import { Brand } from '../../models/brand.entity';

const dirName = './public/upload/product/';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly prodRepo: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brndRepo: Repository<Brand>,
  ) {}

  public async getList(
    query: ProductQuery,
  ): Promise<ProductWithPaginationResponse> {
    const params = { order: '^name', limit: 25, ...query };
    const qb = new QueryBuilder(Product, 'prod', params);

    qb.fieldResolverMap['id'] = 'prod.id';
    qb.fieldResolverMap['name__icontains'] = 'prod.name';

    qb.applyFilterPagination();
    qb.selectRaw(
      ['prod.id', 'id'],
      ['prod.name', 'name'],
      ['prod.picture', 'picture'],
      ['prod.price', 'price'],
    );

    qb.leftJoin((p) => p.brand, 'br');

    const product = await qb.exec();
    return new ProductWithPaginationResponse(product, params);
  }

  public async create(data: ProductCreateDto): Promise<ProductResponse> {
    // if Product name have no value / empty
    if (!data.name) {
      throw new BadRequestException(`Nama product tidak boleh kosong!`);
    }

    const brandExists = await this.brndRepo.findOne({
      where: {
        id: data.brand,
      },
    });

    if (!brandExists) {
      throw new NotFoundException('Brand tidak tersedia');
    }

    const pictName = data.picture
      ? UploadFile.fileRename(data.picture[0].originalname)
      : '';

    // mapping product creation
    let prodCreate = this.prodRepo.create();
    prodCreate.name = data.name;
    prodCreate.picture = pictName.toString();
    prodCreate.price = data.price;
    prodCreate.brand = data.brand;

    try {
      const saveProduct = await this.prodRepo.save(prodCreate);
      if (saveProduct && data.picture) {
        await UploadFile.saveFile(
          data.picture[0].buffer,
          dirName,
          pictName.toString(),
        );
      }
      return new ProductResponse(saveProduct);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Find Product by ID
  public async findById(id: number): Promise<ProductResponse> {
    let getProduct = await this.prodRepo.findOne(id);
    if (!getProduct) {
      throw new NotFoundException('Product tidak ditemukan');
    }

    return new ProductResponse(getProduct);
  }

  // Update Product
  public async update(data: ProductUpdateDto, id: number): Promise<any> {
    // Get product by id id if exists
    let getProduct = await this.prodRepo.findOne(id);
    if (!getProduct) {
      throw new NotFoundException('Product tidak ditemukan');
    }

    const brandExists = await this.brndRepo.findOne({
      where: {
        id: data.brand,
      },
    });

    if (!brandExists) {
      throw new NotFoundException('Brand tidak tersedia');
    }

    const pictName = data.picture
      ? UploadFile.fileRename(data.picture[0].originalname)
      : '';

    // Mapping updated product payload
    let updateProduct = this.prodRepo.create({
      name: data.name,
      picture: pictName.toString(),
      price: data.price,
      brand: data.brand,
    });

    try {
      const saveProduct = await this.prodRepo.update(id, updateProduct);
      if (saveProduct && data.picture) {
        await UploadFile.saveFile(
          data.picture[0].buffer,
          dirName,
          pictName.toString(),
        );
      }
      return {
        message: 'success update product',
        id: id,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Delete product
  public async delete(id: number): Promise<any> {
    let getProduct = await this.prodRepo.findOne(id);
    if (!getProduct) {
      throw new NotFoundException('Product tidak ditemukan');
    }

    try {
      await this.prodRepo.delete(id);
      return {
        message: 'success delete product',
        id: id,
      };
    } catch (e) {
      throw e.message;
    }
  }
}
