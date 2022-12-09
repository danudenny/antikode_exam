import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";

export class OutletDto {
  @ApiProperty({
    description: "Outlet ID",
    example: 1,
  })
  id: number;

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
  longitude: number;

  @ApiProperty({
    description: "Outlet Lat Coordinate",
    example: "-6.200000"
  })
  latitude: number;
}
