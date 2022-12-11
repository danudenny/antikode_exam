import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../../models/brand.entity';
import { Repository, getManager } from 'typeorm';
import {
  BrandResponse,
  BrandWithPaginationResponse,
} from '../domains/brand/brand.response';
import { BrandQuery } from '../domains/brand/brand.query';
import { QueryBuilder } from 'typeorm-query-builder-wrapper';
import { BrandCreateDTO } from '../domains/brand/brand-create.dto';
import { BrandUpdateDTO } from '../domains/brand/brand-update.dto';
import { Outlet } from '../../models/outlet.entity';
import { BrandDetailResponse } from '../domains/brand/brand-detail.response';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brndRepo: Repository<Brand>,
    @InjectRepository(Outlet)
    private readonly outRepo: Repository<Outlet>,
  ) {}

  // List All Brands
  async list(query: BrandQuery): Promise<BrandWithPaginationResponse> {
    const params = { order: '^name', limit: 25, ...query };
    const qb = new QueryBuilder(Brand, 'br', params);

    qb.fieldResolverMap['id'] = 'br.id';
    qb.fieldResolverMap['name__icontains'] = 'br.name';

    qb.applyFilterPagination();
    qb.selectRaw(
      ['br.id', 'id'],
      ['br.name', 'name'],
      ['br.logo', 'logo'],
      ['br.banner', 'banner'],
    );

    const brand = await qb.exec();
    return new BrandWithPaginationResponse(brand, params);
  }

  // Create a Brand
  public async create(data: BrandCreateDTO): Promise<BrandResponse> {
    // Check registered brand name
    const brandExists = await this.brndRepo.findOne({
      where: {
        name: data.name,
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

    const createOutlet = await this.outRepo.findByIds(data.outlets);

    // mapping brand creation
    let createBrand = this.brndRepo.create({
      name: data.name,
      logo: data.logo,
      banner: data.banner,
      outlets: createOutlet,
    });

    try {
      const saveBrand = await this.brndRepo.save(createBrand);

      return new BrandResponse(saveBrand);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Find Brand by ID
  public async findById(id: number): Promise<BrandDetailResponse> {
    let getBrand = await this.brndRepo.findOne(id, {
      relations: ['outlets', 'products'],
    });
    if (!getBrand) {
      throw new NotFoundException('Brand tidak ditemukan');
    }

    return new BrandDetailResponse(getBrand);
  }

  // Update Brand
  public async update(data: BrandUpdateDTO, id: number): Promise<any> {
    // Get brand by id id if exists
    let getBrand = await this.brndRepo.findOne(id);
    if (!getBrand) {
      throw new NotFoundException('Brand tidak ditemukan');
    }

    // Check duplicate brand name
    let { name: brandName } = data;
    brandName = brandName?.trim();
    if (brandName) {
      const brandExists = await getManager().query(
        `SELECT id
         FROM brands
         WHERE id != $1
           AND "name" ILIKE $2`,
        [id, brandName],
      );
      if (brandExists?.length > 0) {
        throw new BadRequestException(`Nama brand sudah terdaftar!`);
      }
    }

    // Mapping updated brand payload
    let updateBrand = this.brndRepo.create({
      name: data.name,
      logo: data?.logo,
      banner: data?.banner,
    });

    try {
      await this.brndRepo.update(id, updateBrand);
      return {
        message: 'success update brand',
        id: id,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Delete brand
  public async delete(id: number): Promise<any> {
    let getBrand = await this.brndRepo.findOne(id);
    if (!getBrand) {
      throw new NotFoundException('Brand tidak ditemukan');
    }

    try {
      await this.brndRepo.delete(id);
      return {
        message: 'success delete brand',
        id: id,
      };
    } catch (e) {
      throw e.message;
    }
  }
}
