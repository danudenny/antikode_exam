import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../../models/product.entity";
import { ProductService } from "../services/product.service";
import { MulterModule } from "@nestjs/platform-express";
import { ProductController } from "../controllers/product.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    MulterModule.register({
      dest: "./public/upload/products"
    })
  ],
  controllers: [ProductController],
  providers: [ProductService]
})

export class ProductModule {}