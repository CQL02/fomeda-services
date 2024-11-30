import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"
import { ReportSchema, Report } from "./domain/schema/report.schema";
import { ReportController } from "./controllers/report.controller";
import { ReportService } from "./services/implementations/report.service";
import { ReportRepository } from "./domain/repositories/report.repository";
import { AuthenticationModule } from "../authentication/authentication.module";
import { ReportMapper } from "./services/mapper/ReportMapper";
import { ProductModule } from "../product/product.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema }
    ]),
    AuthenticationModule,
    ProductModule,
  ],
  controllers: [ReportController],
  providers: [
    { provide: ReportService.name, useClass: ReportService },
    ReportRepository,
    ReportMapper,
  ],
})
export class ReportModule {}