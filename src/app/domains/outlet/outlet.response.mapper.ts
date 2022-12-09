import { OutletDto } from "./outlet.dto";

export class OutletResponseMapper {
  public static toDTO(dto: Partial<OutletDto>): OutletDto {
    const out = new OutletDto();
    out.id = dto.id;
    out.name = dto.name;
    out.picture = dto.picture;
    out.address = dto.address;
    out.longitude = dto.longitude;
    out.latitude = dto.latitude;
    return out;
  }

  public static toManyDTO(dtos: Partial<OutletDto[]>) {
    return dtos.map((d) => OutletResponseMapper.toDTO(d));
  }

  public static fromDTO(
    data: Partial<OutletDto | OutletDto[]>,
  ): OutletDto | OutletDto[] {
    if (!Array.isArray(data)) {
      return this.toDTO(data);
    } else {
      return this.toManyDTO(data);
    }
  }
}
