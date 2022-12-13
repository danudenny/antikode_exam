import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OutletDto } from '../outlet/outlet.dto';
import { ProductDto } from '../product/product.dto';

export class BrandDTO {
  @ApiProperty({
    description: 'Brand ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Brand Name',
    example: 'Apple',
  })
  @IsNotEmpty()
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

  @ApiProperty({
    description: 'Brand outlet',
    type: [OutletDto],
  })
  @IsOptional()
  outlets: OutletDto[];

  @ApiProperty({
    description: 'Brand products',
    type: [ProductDto],
  })
  @IsOptional()
  products: ProductDto[];
}
