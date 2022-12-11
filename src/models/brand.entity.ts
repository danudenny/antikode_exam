import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
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

  @ManyToMany(() => Outlet, { eager: true })
  @JoinTable({
    name: 'brand_outlets',
    joinColumn: {
      name: 'brand_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'outlet_id',
      referencedColumnName: 'id',
    },
  })
  outlets: Outlet[];

  @ManyToMany(() => Product, { eager: true })
  @JoinTable({
    name: 'brand_products',
    joinColumn: {
      name: 'brand_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}
