import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from "class-validator";
import { BaseQuery } from "../base/base.query";

export class OutletQuery extends BaseQuery {
  @ApiPropertyOptional({
    description: 'Outlet ID to filter',
    example: 1,
  })
  @IsOptional()
  id: number;

  @ApiPropertyOptional({
    description: 'Search by Outlet Name (using ILIKE sql)',
    example: 'jakarta',
  })
  @IsString()
  name__icontains: string;

}