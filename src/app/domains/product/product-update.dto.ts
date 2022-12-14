import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUploadFile } from '../base/upload.interface';
import { Brand } from '../../../models/brand.entity';

export class ProductUpdateDto {
  @ApiProperty({
    description: 'Product Name',
    example: 'Iphone 14 Pro',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Product Image',
    example: '',
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  picture: IUploadFile;

  @ApiProperty({
    description: 'Product Proce',
    example: 1000000,
  })
  price: number;

  @ApiProperty({
    description: 'Brand ID',
    example: 1,
    type: Number,
  })
  brand: Brand;
}
