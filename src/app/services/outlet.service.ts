import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outlet } from '../../models/outlet.entity';
import { Repository } from 'typeorm';
import {
  OutletResponse,
  OutletWithPaginationResponse,
} from '../domains/outlet/outlet.response';
import { QueryBuilder } from 'typeorm-query-builder-wrapper';
import { OutletCreateDto } from '../domains/outlet/outlet-create.dto';
import { OutletQuery } from '../domains/outlet/outlet.query';
import { OutletUpdateDto } from '../domains/outlet/outlet-update.dto';
import { parseBool } from '../../utils/parse-bool';
import { UploadFile } from '../../utils/upload-file';
import { Brand } from '../../models/brand.entity';

const dirName = './public/upload/outlet/';

const monasLoc = {
  lat: '-6.1753924',
  long: '106.8245779',
};

@Injectable()
export class OutletService {
  constructor(
    @InjectRepository(Brand)
    private readonly brndRepo: Repository<Brand>,
    @InjectRepository(Outlet)
    private readonly outRepo: Repository<Outlet>,
  ) {}

  // Get all outlets
  public async getList(
    query: OutletQuery,
  ): Promise<OutletWithPaginationResponse> {
    const params = { limit: 25, ...query };
    const qb = new QueryBuilder(Outlet, 'out', params);

    qb.fieldResolverMap['id'] = 'out.id';
    qb.fieldResolverMap['name__icontains'] = 'out.name';

    qb.applyFilterPagination();
    qb.selectRaw(
      ['out.id', 'id'],
      ['out.name', 'name'],
      ['out.address', 'address'],
      ['out.picture', 'picture'],
      ['out.longitude', 'longitude'],
      ['out.latitude', 'latitude'],
    );

    const getNearest = parseBool(query.nearest);

    qb.qb.addOrderBy(
      `(longitude - ${monasLoc.lat}) * (longitude - ${monasLoc.lat}) +
                         (latitude - ${monasLoc.long}) * (latitude - ${monasLoc.long})`,
      getNearest === true ? 'ASC' : 'DESC',
    );

    const outlet = await qb.exec();
    return new OutletWithPaginationResponse(outlet, params);
  }

  public async create(data: OutletCreateDto): Promise<OutletResponse> {
    // if Outlet name have no value / empty
    if (!data.name) {
      throw new BadRequestException(`Nama outlet tidak boleh kosong!`);
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

    // mapping Outlet creation
    let createOutlet = this.outRepo.create();
    createOutlet.name = data.name;
    createOutlet.picture = pictName.toString();
    createOutlet.address = data.address;
    createOutlet.longitude = data.longitude;
    createOutlet.latitude = data.latitude;
    createOutlet.brand = data.brand;

    try {
      const saveOutlet = await this.outRepo.save(createOutlet);
      if (saveOutlet && data.picture) {
        await UploadFile.saveFile(
          data.picture[0].buffer,
          dirName,
          pictName.toString(),
        );
      }
      return new OutletResponse(saveOutlet);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Find Outlet by ID
  public async findById(id: number): Promise<OutletResponse> {
    let getOutlet = await this.outRepo.findOne(id);
    if (!getOutlet) {
      throw new NotFoundException('Outlet tidak ditemukan');
    }

    return new OutletResponse(getOutlet);
  }

  // Update Outlet
  public async update(data: OutletUpdateDto, id: number): Promise<any> {
    // Get outlet by id id if exists
    let getOutlet = await this.outRepo.findOne(id);
    if (!getOutlet) {
      throw new NotFoundException('Outlet tidak ditemukan');
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

    // Mapping updated outlet payload
    let updateOutlet = this.outRepo.create({
      name: data.name,
      picture: pictName.toString(),
      address: data.address,
      longitude: data.longitude,
      latitude: data.latitude,
      brand: data.brand,
    });

    try {
      const saveOutlet = await this.outRepo.update(id, updateOutlet);
      if (saveOutlet && data.picture) {
        await UploadFile.saveFile(
          data.picture[0].buffer,
          dirName,
          pictName.toString(),
        );
      }
      return {
        message: 'success update outlet',
        id: id,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Delete outlet
  public async delete(id: number): Promise<any> {
    let getOutlet = await this.outRepo.findOne(id);
    if (!getOutlet) {
      throw new NotFoundException('Outlet tidak ditemukan');
    }

    try {
      await this.outRepo.delete(id);
      return {
        message: 'success delete outlet',
        id: id,
      };
    } catch (e) {
      throw e.message;
    }
  }
}
