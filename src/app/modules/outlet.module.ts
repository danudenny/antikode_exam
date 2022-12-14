import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outlet } from '../../models/outlet.entity';
import { OutletService } from '../services/outlet.service';
import { MulterModule } from '@nestjs/platform-express';
import { OutletController } from '../controllers/outlet.controller';
import { Brand } from '../../models/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Outlet, Brand]), MulterModule.register()],
  controllers: [OutletController],
  providers: [OutletService],
})
export class OutletModule {}
