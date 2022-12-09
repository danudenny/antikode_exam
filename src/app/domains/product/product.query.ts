import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from "class-validator";
import { BaseQuery } from "../base/base.query";

export class ProductQuery extends BaseQuery {
  @ApiPropertyOptional({
    description: 'Product ID to filter',
    example: 1,
  })
  @IsOptional()
  id: number;

  @ApiPropertyOptional({
    description: 'Search by product Name (using ILIKE sql)',
    example: 'iphone',
  })
  @IsString()
  name__icontains: string;

}
