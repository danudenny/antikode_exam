import { BaseResponse } from "../base/base.response";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { BrandDTO } from "./brand.dto";
import { PaginationBuilder } from "../base/pagination-builder";
import { BasePaginationResponse } from "../base/base-pagination.response";
import { BrandResponseMapper } from "./brand.response.mapper";

export class BrandResponse extends BaseResponse {
  constructor(data?: Partial<BrandDTO | BrandDTO[]>) {
    super();
    if (data) {
      this.data = BrandResponseMapper.fromDTO(data);
    }
  }

  @ApiPropertyOptional({ type: () => [BrandDTO] })
  data?: BrandDTO | BrandDTO[] = null;
}

export class BrandWithPaginationResponse extends BaseResponse {
  constructor(data?: Partial<BrandDTO | BrandDTO[]>, params?: any) {
    super();
    if (data) {
      this.data = BrandResponseMapper.fromDTO(data);
      this.meta = PaginationBuilder.build(data, params);
    }
  }

  @ApiPropertyOptional({ type: () => [BrandDTO] })
  data?: BrandDTO | BrandDTO[] = null;

  @ApiPropertyOptional()
  meta?: BasePaginationResponse;
}
