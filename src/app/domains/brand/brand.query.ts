import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from "class-validator";
import { BaseQuery } from "../base/base.query";

export class BrandQuery extends BaseQuery {
  @ApiPropertyOptional({
    description: 'Brand ID to filter',
    example: 1,
  })
  @IsOptional()
  id: number;

  @ApiPropertyOptional({
    description: 'Search by Brand Name (using ILIKE sql)',
    example: 'apple',
  })
  @IsString()
  name__icontains: string;
}
