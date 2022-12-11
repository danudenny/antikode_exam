import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseModel } from './base_model';
import { Brand } from './brand.entity';

@Entity('products')
export class Product extends BaseModel {
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
  picture: string;

  @Column({
    type: 'decimal',
    precision: 2,
    nullable: false,
  })
  price: number;

  @ManyToMany(() => Brand, { eager: true })
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
  brands: Brand[];
}
