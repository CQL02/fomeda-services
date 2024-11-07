"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const report_schema_1 = require("./domain/schema/report.schema");
const report_controller_1 = require("./controllers/report.controller");
const report_service_1 = require("./services/implementations/report.service");
const report_repository_1 = require("./domain/repositories/report.repository");
const authentication_module_1 = require("../authentication/authentication.module");
const ReportMapper_1 = require("./services/mapper/ReportMapper");
let ReportModule = class ReportModule {
};
exports.ReportModule = ReportModule;
exports.ReportModule = ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: report_schema_1.Report.name, schema: report_schema_1.ReportSchema }
            ]),
            authentication_module_1.AuthenticationModule,
        ],
        controllers: [report_controller_1.ReportController],
        providers: [
            { provide: report_service_1.ReportService.name, useClass: report_service_1.ReportService },
            report_repository_1.ReportRepository,
            ReportMapper_1.ReportMapper,
        ],
    })
], ReportModule);
//# sourceMappingURL=report.module.js.map