import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class BrandCreateDTO {
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

}