import { ProductDto } from './product.dto';
import { BrandDTO } from '../brand/brand.dto';
import { Brand } from '../../../models/brand.entity';

export class ProductResponseMapper {
  public static toDTO(dto: Partial<ProductDto>): ProductDto {
    const prod = new ProductDto();
    prod.id = dto.id;
    prod.name = dto.name;
    prod.picture = dto.picture;
    prod.price = dto.price;
    prod.brand = this.toBrandDTO(dto.brand);
    return prod;
  }

  public static toManyDTO(dtos: Partial<ProductDto[]>) {
    return dtos.map((d) => ProductResponseMapper.toDTO(d));
  }

  public static fromDTO(
    data: Partial<ProductDto | ProductDto[]>,
  ): ProductDto | ProductDto[] {
    if (!Array.isArray(data)) {
      return this.toDTO(data);
    } else {
      return this.toManyDTO(data);
    }
  }

  private static toBrandDTO(dto: Partial<Brand>): Brand {
    const br = new Brand();
    br.name = dto.name;
    return br;
  }
}
