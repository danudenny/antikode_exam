import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseModel } from './base_model';
import { Brand } from './brand.entity';

@Entity('outlets')
export class Outlet extends BaseModel {
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
    type: 'text',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 7,
    nullable: false,
  })
  longitude: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 7,
    nullable: false,
  })
  latitude: number;
}
