import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../../models/product.entity";
import { getManager, Repository } from "typeorm";
import { ProductResponse, ProductWithPaginationResponse } from "../domains/product/product.response";
import { ProductQuery } from "../domains/product/product.query";
import { QueryBuilder } from "typeorm-query-builder-wrapper";
import { ProductCreateDto } from "../domains/product/product-create.dto";
import { ProductUpdateDto } from "../domains/product/product-update.dto";
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly prodRepo: Repository<Product>
  ) {}

  public async getList(
    query: ProductQuery
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

    const product = await qb.exec();
    return new ProductWithPaginationResponse(product, params)
  }

  public async create(
    data: ProductCreateDto
  ): Promise<ProductResponse> {
    // Check registered product name
    const productExists = await this.prodRepo.findOne({
      where: {
        name: data.name
      },
    });

    // if Product name already registered
    if (productExists) {
      throw new BadRequestException(`Nama product sudah terdaftar!`);
    }

    // if Product name have no value / empty
    if (!data.name) {
      throw new BadRequestException(`Nama product tidak boleh kosong!`);
    }

    // mapping product creation
    let prodCreate = this.prodRepo.create();
    prodCreate.name = data.name;
    prodCreate.picture = data.picture;
    prodCreate.price = data.price;

    try {
      const saveProduct = await this.prodRepo.save(prodCreate);
      return new ProductResponse(saveProduct)
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Find Product by ID
  public async findById(id: number): Promise<ProductResponse> {
    let getProduct = await this.prodRepo.findOne(id);
    if (!getProduct) {
      throw new NotFoundException("Product tidak ditemukan")
    }

    return new ProductResponse(getProduct)
  }

  // Update Product
  public async update(data: ProductUpdateDto, id: number): Promise<any> {
    // Get product by id id if exists
    let getProduct = await this.prodRepo.findOne(id);
    if (!getProduct) {
      throw new NotFoundException("Product tidak ditemukan")
    }

    // Check duplicate product name
    let { name: prodName } = data;
    prodName = prodName?.trim();
    if (prodName) {
      const prodExists = await getManager().query(
        `SELECT id FROM products WHERE id != $1 AND "name" ILIKE $2`,
        [id, prodName],
      );
      if (prodExists?.length > 0) {
        throw new BadRequestException(`Nama product sudah terdaftar!`);
      }
    }

    // Mapping updated product payload
    let updateProduct = this.prodRepo.create({
      name: data.name,
      picture: data?.picture,
      price: data.price,
    });

    try {
      await this.prodRepo.update(id, updateProduct);
      return {
        "message": "success update product",
        "id": id
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
      throw new NotFoundException("Product tidak ditemukan")
    }

    try {
      await this.prodRepo.delete(id);
      return {
        "message": "success delete product",
        "id": id
      }
    } catch (e) {
      throw e.message
    }

  }
}