import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Outlet } from "../../models/outlet.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Outlet])],
  controllers: [],
  providers: []
})

export class OutletModule {}