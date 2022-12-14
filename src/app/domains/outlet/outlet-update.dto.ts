import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Brand } from '../../../models/brand.entity';
import { IUploadFile } from '../base/upload.interface';

export class OutletUpdateDto {
  @ApiProperty({
    description: 'Outlet Name',
    example: 'Outlet Mall GI',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Outlet Photo',
    example: '',
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  picture: IUploadFile;

  @ApiProperty({
    description: 'Outlet Address',
    example: 'Jakarta',
  })
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'Outlet Long Coordinate',
    example: '106.816666',
    type: Number,
  })
  longitude: any;

  @ApiProperty({
    description: 'Outlet Lat Coordinate',
    example: '-6.200001',
    type: Number,
  })
  latitude: any;

  @ApiProperty({
    description: 'Brand ID',
    example: 1,
    type: Number,
  })
  brand: Brand;
}
