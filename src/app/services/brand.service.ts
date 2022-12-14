import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../../models/brand.entity';
import { getManager, Repository } from 'typeorm';
import {
  BrandResponse,
  BrandWithPaginationResponse,
} from '../domains/brand/brand.response';
import { BrandQuery } from '../domains/brand/brand.query';
import { QueryBuilder } from 'typeorm-query-builder-wrapper';
import { BrandCreateDTO } from '../domains/brand/brand-create.dto';
import { BrandUpdateDTO } from '../domains/brand/brand-update.dto';
import { BrandDetailResponse } from '../domains/brand/brand-detail.response';
import { UploadFile } from '../../utils/upload-file';

const dirName = './public/upload/brand/';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brndRepo: Repository<Brand>,
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

    const logoName = data.logo
      ? UploadFile.fileRename(data.logo[0].originalname)
      : '';
    const bannerName = data.banner
      ? UploadFile.fileRename(data.banner[0].originalname)
      : '';

    // mapping brand creation
    let createBrand = this.brndRepo.create({
      name: data.name,
      logo: logoName.toString() || null,
      banner: bannerName.toString() || null,
    });

    try {
      const saveBrand = await this.brndRepo.save(createBrand);
      if (saveBrand) {
        if (data.logo) {
          await UploadFile.saveFile(
            data.logo[0].buffer,
            dirName,
            logoName.toString(),
          );
        }
        if (data.banner) {
          await UploadFile.saveFile(
            data.banner[0].buffer,
            dirName,
            bannerName.toString(),
          );
        }
      }
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

    const logoName = data.logo
      ? UploadFile.fileRename(data.logo[0].originalname)
      : getBrand.logo;
    const bannerName = data.banner
      ? UploadFile.fileRename(data.banner[0].originalname)
      : getBrand.banner;

    const newBrand = {
      name: data.name,
      logo: data.logo ? logoName.toString() : getBrand.logo,
      banner: data.logo ? bannerName.toString() : getBrand.banner,
    };

    const updateBrand = this.brndRepo.merge(getBrand, newBrand);

    try {
      const save = (await this.brndRepo.save(updateBrand)).id;
      if (save) {
        if (data.logo) {
          await UploadFile.saveFile(
            data.logo[0].buffer,
            dirName,
            logoName.toString(),
          );
        }
        if (data.banner) {
          await UploadFile.saveFile(
            data.banner[0].buffer,
            dirName,
            bannerName.toString(),
          );
        }
      }

      return;
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
