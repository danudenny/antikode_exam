import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Brand } from "../../models/brand.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [],
  providers: []
})

export class BrandModule {}