import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "../../models/brand.entity";
import { Repository, Raw } from "typeorm"
import { BrandResponse, BrandWithPaginationResponse } from "../domains/brand/brand.response";
import { BrandQuery } from "../domains/brand/brand.query";
import { QueryBuilder } from "typeorm-query-builder-wrapper";
import { BrandCreateDTO } from "../domains/brand/brand-create.dto";

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brndRepo: Repository<Brand>
  ) {}

  // List All Brands
  async list(
    query: BrandQuery
  ): Promise<BrandWithPaginationResponse> {
    const params = { order: '^name', limit: 25, ...query };
    const qb = new QueryBuilder(Brand, 'br', params);

    qb.fieldResolverMap['id'] = 'br.id';
    qb.fieldResolverMap['name__icontains'] = 'br.name';

    qb.applyFilterPagination();
    qb.selectRaw(
      ['br.id', 'id'],
      ['br.name', 'name'],
      ['br.logo', 'logo'],
      ['br.banner', 'banner']
    );

    const brand = await qb.exec();
    return new BrandWithPaginationResponse(brand, params);
  }

  // Create a Brand
  public async create(data: BrandCreateDTO): Promise<BrandResponse> {
    console.log(data);
    // Check registered brand name
    const brandExists = await this.brndRepo.findOne({
      where: {
        name: data.name
      },
    });

    // if Brand name already registered
    if (brandExists) {
      throw new BadRequestException(`Nama brand sudah terdaftar!`);
    }

    // if Brand name have no value / empty
    if (!data.name) {
      throw new BadRequestException(`Nama produk tidak boleh kosong!`);
    }

    // mapping brand creation
    let createBrand = this.brndRepo.create({
      name: data.name,
      logo: data.logo,
      banner: data.banner
    });

    try {
      const saveBrand = await this.brndRepo.save(createBrand);
      return new BrandResponse(saveBrand);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async findById() {

  }

}