import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../models/product.entity';
import { ProductService } from '../services/product.service';
import { MulterModule } from '@nestjs/platform-express';
import { ProductController } from '../controllers/product.controller';
import { Brand } from '../../models/brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Brand]),
    MulterModule.register(),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
