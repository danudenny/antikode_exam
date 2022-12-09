import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Outlet } from "../../models/outlet.entity";
import { OutletService } from "../services/outlet.service";
import { MulterModule } from "@nestjs/platform-express";
import { OutletController } from "../controllers/outlet.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Outlet]),
    MulterModule.register({
      dest: "./public/upload/outlet"
    })
  ],
  controllers: [OutletController],
  providers: [OutletService]
})

export class OutletModule {}