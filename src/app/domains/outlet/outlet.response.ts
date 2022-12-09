import { BaseResponse } from "../base/base.response";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationBuilder } from "../base/pagination-builder";
import { BasePaginationResponse } from "../base/base-pagination.response";
import { OutletResponseMapper } from "./outlet.response.mapper";
import { OutletDto } from "./outlet.dto";

export class OutletResponse extends BaseResponse {
  constructor(data?: Partial<OutletDto | OutletDto[]>) {
    super();
    if (data) {
      this.data = OutletResponseMapper.fromDTO(data);
    }
  }

  @ApiPropertyOptional({ type: () => [OutletDto] })
  data?: OutletDto | OutletDto[] = null;
}

export class OutletWithPaginationResponse extends BaseResponse {
  constructor(data?: Partial<OutletDto | OutletDto[]>, params?: any) {
    super();
    if (data) {
      this.data = OutletResponseMapper.fromDTO(data);
      this.meta = PaginationBuilder.build(data, params);
    }
  }

  @ApiPropertyOptional({ type: () => [OutletDto] })
  data?: OutletDto | OutletDto[] = null;

  @ApiPropertyOptional()
  meta?: BasePaginationResponse;
}
