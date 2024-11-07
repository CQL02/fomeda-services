"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const sequence_schema_1 = require("./domain/schema/sequence.schema");
const sequence_services_1 = require("./services/implementations/sequence.services");
const sequence_repository_1 = require("./domain/repositories/sequence.repository");
const sequence_controller_1 = require("./controller/sequence.controller");
let SequenceModule = class SequenceModule {
};
exports.SequenceModule = SequenceModule;
exports.SequenceModule = SequenceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: sequence_schema_1.Sequence.name, schema: sequence_schema_1.SequenceSchema },
            ]),
        ],
        providers: [
            { provide: sequence_services_1.SequenceService.name, useClass: sequence_services_1.SequenceService },
            sequence_repository_1.SequenceRepository
        ],
        controllers: [sequence_controller_1.SequenceController],
        exports: [sequence_services_1.SequenceService.name],
    })
], SequenceModule);
//# sourceMappingURL=sequence.module.js.map