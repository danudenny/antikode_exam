import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { LoaderEnv } from './config/loader';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    LoaderEnv,
    TypeOrmModule.forRoot(LoaderEnv.getTypeOrmConfig()),
    LoggerModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
