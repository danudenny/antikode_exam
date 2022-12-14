import { Entity, Column, OneToMany } from 'typeorm';
import { BaseModel } from './base_model';
import { Outlet } from './outlet.entity';
import { Product } from './product.entity';

@Entity('brands')
export class Brand extends BaseModel {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  logo: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  banner: string;

  @OneToMany(() => Outlet, (outlet) => outlet.brand)
  outlets: Outlet[];

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
