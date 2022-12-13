import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../../models/brand.entity';
import { BrandService } from '../services/brand.service';
import { BrandController } from '../controllers/brand.controller';
import { MulterModule } from '@nestjs/platform-express';
import { Outlet } from '../../models/outlet.entity';
import { Product } from '../../models/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand, Outlet, Product]),
    MulterModule.register(),
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
