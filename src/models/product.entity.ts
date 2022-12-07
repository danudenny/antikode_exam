import { Entity, Column } from 'typeorm'
import { BaseModel } from "./base_model";

@Entity('products')
export class Product extends BaseModel{
  @Column({
    type: "varchar",
    length: 100,
    nullable: false
  })
  name: string

  @Column({
    type: "text",
    nullable: true
  })
  picture: string

  @Column({
    type: "decimal",
    precision: 2,
    nullable: false
  })
  price: number

}