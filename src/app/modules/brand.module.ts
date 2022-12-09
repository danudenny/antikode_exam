import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Brand } from "../../models/brand.entity";
import { BrandService } from "../services/brand.service";
import { BrandController } from "../controllers/brand.controller";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand]),
    MulterModule.register({
      dest: "./public/upload/brand"
    })
  ],
  controllers: [BrandController],
  providers: [BrandService]
})

export class BrandModule {}