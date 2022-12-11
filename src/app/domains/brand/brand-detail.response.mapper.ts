import { BrandDTO } from "./brand.dto";
import { Outlet } from "../../../models/outlet.entity";
import { BrandDetailDTO } from "./brand-detail.dto";
import { Brand } from "../../../models/brand.entity";
import { OutletDto } from "../outlet/outlet.dto";
import { Product } from "../../../models/product.entity";
import { ProductDto } from "../product/product.dto";

export class BrandDetailResponseMapper {
  public static toDTO(dto: BrandDetailDTO): BrandDetailDTO {
    return dto;
  }

  private static toOutletDTO(data: Outlet[]): OutletDto[] {
    return data.map((o) => {
      const item = new OutletDto();
      item.name = o.name;
      item.address = o.address;
      item.picture = o.picture;
      item.longitude = o.longitude;
      item.latitude = o.latitude;
      return item;
    });
  }

  private static toProductDTO(data: Product[]): ProductDto[] {
    return data.map((o) => {
      const item = new ProductDto();
      item.name = o.name;
      item.picture = o.picture;
      item.price = o.price;
      return item;
    });
  }

  public static fromOneEntity(ety: Partial<Brand>) {
    return this.toDTO(<BrandDetailDTO>{
      id: ety.id,
      name: ety.name,
      logo: ety.logo,
      banner: ety.banner,
      outlets: this.toOutletDTO(ety.outlets),
      products: this.toProductDTO(ety.products)
    });
  }

  public static fromEntity(entities: Partial<Brand>): BrandDetailDTO {
    return this.fromOneEntity(entities);
  }
}
