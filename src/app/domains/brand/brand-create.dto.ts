import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Outlet } from '../../../models/outlet.entity';
import { Product } from '../../../models/product.entity';
import { IUploadFile } from '../base/upload.interface';
import { Transform, Type } from 'class-transformer';

export class BrandCreateDTO {
  @ApiProperty({
    description: 'Brand Name',
    example: 'Apple',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Brand Logo',
    example: '',
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  logo: IUploadFile;

  @ApiPropertyOptional({
    description: 'Brand Banner Image',
    example: '',
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  banner: IUploadFile;

  // @ApiProperty({
  //   type: Number,
  //   required: false,
  // })
  // @IsOptional()
  // outlets: Outlet[];
  //
  // @ApiProperty({
  //   type: Number,
  //   required: false,
  // })
  // @IsOptional()
  // products: Product[];
}
