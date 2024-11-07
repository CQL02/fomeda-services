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
exports.AbstractRepository = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
let AbstractRepository = class AbstractRepository {
    constructor(model) {
        this.model = model;
    }
    async create(createDto) {
        const createdEntity = new this.model(createDto);
        return createdEntity.save();
    }
    async findAll() {
        return this.model.find().exec();
    }
    async findAllByFilter(filterDto, projection = {}) {
        return this.model.find(filterDto, projection).exec();
    }
    async findOneById(id) {
        return this.model.findById(id).exec();
    }
    async findOneByFilter(filterDto, projection = {}) {
        return this.model.findOne(filterDto, projection).exec();
    }
    async update(id, updateDto) {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }
    async updateOneByFilter(filterDto, updateDto) {
        return this.model.findOneAndUpdate(filterDto, updateDto, { new: true }).exec();
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
    async aggregate(pipeline) {
        return this.model.aggregate(pipeline);
    }
};
exports.AbstractRepository = AbstractRepository;
exports.AbstractRepository = AbstractRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AbstractRepository);
//# sourceMappingURL=repository.abstract.js.map