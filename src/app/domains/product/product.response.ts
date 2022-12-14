import { BaseResponse } from '../base/base.response';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationBuilder } from '../base/pagination-builder';
import { BasePaginationResponse } from '../base/base-pagination.response';
import { ProductDto } from './product.dto';
import { ProductResponseMapper } from './product.response.mapper';

export class ProductResponse extends BaseResponse {
  @ApiPropertyOptional({ type: () => [ProductDto] })
  data?: ProductDto | ProductDto[] = null;

  constructor(data?: Partial<ProductDto | ProductDto[]>) {
    super();
    if (data) {
      this.data = ProductResponseMapper.fromDTO(data);
    }
  }
}

export class ProductWithPaginationResponse extends BaseResponse {
  @ApiPropertyOptional({ type: () => [ProductDto] })
  data?: ProductDto | ProductDto[] = null;
  @ApiPropertyOptional({ type: () => BasePaginationResponse })
  meta?: BasePaginationResponse;

  constructor(data?: Partial<ProductDto | ProductDto[]>, params?: any) {
    super();
    if (data) {
      this.data = ProductResponseMapper.fromDTO(data);
      this.meta = PaginationBuilder.build(data, params);
    }
  }
}
