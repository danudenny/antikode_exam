import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { LoaderEnv } from './config/loader';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandModule } from "./app/modules/brand.module";
import { OutletModule } from "./app/modules/outlet.module";
import { ProductModule } from "./app/modules/product.module";

@Module({
  imports: [
    LoaderEnv,
    TypeOrmModule.forRoot(LoaderEnv.getTypeOrmConfig()),
    LoggerModule.forRoot(),
    BrandModule,
    OutletModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
