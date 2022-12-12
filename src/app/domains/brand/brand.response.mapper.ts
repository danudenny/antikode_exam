import { BrandDTO } from './brand.dto';

export class BrandResponseMapper {
  public static toDTO(dto: Partial<BrandDTO>): BrandDTO {
    const brnd = new BrandDTO();
    brnd.id = dto.id;
    brnd.name = dto.name;
    brnd.logo = dto.logo;
    brnd.banner = dto.banner;
    return brnd;
  }

  public static toManyDTO(dtos: Partial<BrandDTO[]>) {
    return dtos.map((d) => BrandResponseMapper.toDTO(d));
  }

  public static fromDTO(
    data: Partial<BrandDTO | BrandDTO[]>,
  ): BrandDTO | BrandDTO[] {
    if (!Array.isArray(data)) {
      return this.toDTO(data);
    } else {
      return this.toManyDTO(data);
    }
  }
}
