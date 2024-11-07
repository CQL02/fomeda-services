"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceController = void 0;
const common_1 = require("@nestjs/common");
const sequence_dto_1 = require("../dtos/sequence.dto");
const sequence_services_1 = require("../services/implementations/sequence.services");
let SequenceController = class SequenceController {
    constructor(sequenceService) {
        this.sequenceService = sequenceService;
    }
    async generateId(sequenceDto) {
        return await this.sequenceService.generateId(sequenceDto.prefix);
    }
};
exports.SequenceController = SequenceController;
__decorate([
    (0, common_1.Put)('generate-id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sequence_dto_1.SequenceDto]),
    __metadata("design:returntype", Promise)
], SequenceController.prototype, "generateId", null);
exports.SequenceController = SequenceController = __decorate([
    (0, common_1.Controller)('sequence'),
    __param(0, (0, common_1.Inject)(sequence_services_1.SequenceService.name)),
    __metadata("design:paramtypes", [Object])
], SequenceController);
//# sourceMappingURL=sequence.controller.js.map