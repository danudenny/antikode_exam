import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "timestamp",
    default: new Date(),
    name: "created_at"
  })
  createdAt: Date

  @Column({
    type: "timestamp",
    default: new Date(),
    name: "updated_at"
  })
  updatedAt: Date
}