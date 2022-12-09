import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";

export class OutletCreateDto {
  @ApiProperty({
    description: "Outlet Name",
    example: "Outlet Mall GI",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Outlet Picture",
    example: ""
  })
  @IsOptional()
  picture: string;

  @ApiProperty({
    description: "Outlet Address",
    example: "Jakarta"
  })
  @IsOptional()
  address: string;

  @ApiProperty({
    description: "Outlet Long Coordinate",
    example: "106.816666"
  })
  longitude: any;

  @ApiProperty({
    description: "Outlet Lat Coordinate",
    example: "-6.200000"
  })
  latitude: any;
}
