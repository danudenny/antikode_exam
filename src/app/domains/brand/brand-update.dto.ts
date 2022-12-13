import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Outlet } from '../../../models/outlet.entity';
import { Product } from '../../../models/product.entity';
import { IUploadFile } from './upload.interface';

export class BrandUpdateDTO {
  @ApiProperty({
    description: 'Brand Name',
    example: 'Apple',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Brand Logo',
    example: '',
    type: 'binary',
  })
  logo: IUploadFile;

  @ApiProperty({
    description: 'Brand Banner Image',
    example: '',
    type: 'binary',
  })
  @IsOptional()
  banner: IUploadFile;

  @ApiProperty()
  outlets: Outlet[];

  @ApiProperty()
  products: Product[];
}
