import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Outlet } from '../../../models/outlet.entity';
import { Product } from '../../../models/product.entity';

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
  })
  logo: string;

  @ApiProperty({
    description: 'Brand Banner Image',
    example: '',
  })
  @IsOptional()
  banner: string;

  @ApiProperty()
  outlets: Outlet[];

  @ApiProperty()
  products: Product[];
}
