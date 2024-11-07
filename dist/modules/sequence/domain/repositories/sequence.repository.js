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
exports.SequenceRepository = void 0;
const common_1 = require("@nestjs/common");
const repository_abstract_1 = require("../../../../common/database/abstracts/repository.abstract");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sequence_schema_1 = require("../schema/sequence.schema");
let SequenceRepository = class SequenceRepository extends repository_abstract_1.AbstractRepository {
    constructor(sequenceModel) {
        super(sequenceModel);
        this.sequenceModel = sequenceModel;
    }
    async findOneAndUpdate(prefix, update) {
        return this.sequenceModel
            .findOneAndUpdate({ prefix }, update, { upsert: true, new: true })
            .exec();
    }
    async findOneByPrefix(prefix) {
        return this.sequenceModel.findOne({ prefix }).exec();
    }
};
exports.SequenceRepository = SequenceRepository;
exports.SequenceRepository = SequenceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(sequence_schema_1.Sequence.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SequenceRepository);
//# sourceMappingURL=sequence.repository.js.map