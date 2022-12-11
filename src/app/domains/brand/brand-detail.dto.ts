import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { Outlet } from "../../../models/outlet.entity";
import { Product } from "../../../models/product.entity";

export class BrandDetailDTO {
  @ApiProperty({
    description: "Brand ID",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "Brand Name",
    example: "Apple",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Brand Logo",
    example: ""
  })
  logo: string;

  @ApiProperty({
    description: "Brand Banner Image",
    example: ""
  })
  @IsOptional()
  banner: string;

  @ApiProperty({
    description: "Brand outlet",
    type: [Outlet]
  })
  @IsOptional()
  outlets: Outlet[];

  @ApiProperty({
    description: "Brand products",
    type: [Product]
  })
  @IsOptional()
  products: Product[];

}
