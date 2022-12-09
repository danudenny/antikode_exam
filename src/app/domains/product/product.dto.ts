import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";

export class ProductDto {
  @ApiProperty({
    description: "Product ID",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "Product Name",
    example: "Iphone 14 Pro",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Product Picture",
    example: ""
  })
  @IsOptional()
  picture: string;

  @ApiProperty({
    description: "Product Proce",
    example: 1000000
  })
  price: number;

}
