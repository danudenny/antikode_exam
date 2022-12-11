import { BaseResponse } from "../base/base.response";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Brand } from "../../../models/brand.entity";
import { BrandDetailResponseMapper } from "./brand-detail.response.mapper";
import { BrandDetailDTO } from "./brand-detail.dto";

export class BrandDetailResponse extends BaseResponse {
  constructor(data?: Partial<Brand>) {
    super();
    if (data) {
      this.data = BrandDetailResponseMapper.fromEntity(data);
    }
  }

  @ApiPropertyOptional({ type: () => BrandDetailDTO })
  data?: BrandDetailDTO = null;

}