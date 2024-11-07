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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceService = void 0;
const common_1 = require("@nestjs/common");
const sequence_repository_1 = require("../../domain/repositories/sequence.repository");
let SequenceService = class SequenceService {
    constructor(sequenceRepository) {
        this.sequenceRepository = sequenceRepository;
    }
    async generateId(prefix) {
        const sequenceDoc = await this.sequenceRepository.findOneAndUpdate(prefix, {
            $inc: { sequence_value: 1 },
        });
        const paddedValue = sequenceDoc.sequence_value.toString().padStart(12, '0');
        return `${prefix}${paddedValue}`;
    }
};
exports.SequenceService = SequenceService;
exports.SequenceService = SequenceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sequence_repository_1.SequenceRepository])
], SequenceService);
//# sourceMappingURL=sequence.services.js.map