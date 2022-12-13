import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseQuery } from '../base/base.query';
import { ToBoolean } from '../../../utils/convert-boolean';

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
  name__icontains?: string;

  @ApiPropertyOptional({
    description: 'Get nearest location to monas',
    example: true,
  })
  @ToBoolean()
  nearest: boolean;
}
