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
exports.AnnouncementSchema = exports.Announcement = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const schema_abstract_1 = require("../../../../common/database/abstracts/schema.abstract");
const uuid_1 = require("uuid");
const mongoose_2 = require("mongoose");
let Announcement = class Announcement extends schema_abstract_1.SchemaAbstract {
};
exports.Announcement = Announcement;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        default: uuid_1.v4,
        unique: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Announcement.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Array,
    }),
    __metadata("design:type", Array)
], Announcement.prototype, "file_uploaded", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: Date.now,
    }),
    __metadata("design:type", Date)
], Announcement.prototype, "created_on", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "created_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: Date.now,
    }),
    __metadata("design:type", Date)
], Announcement.prototype, "updated_on", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "updated_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true,
    }),
    __metadata("design:type", Boolean)
], Announcement.prototype, "visibility", void 0);
exports.Announcement = Announcement = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: 'announcement' })
], Announcement);
exports.AnnouncementSchema = mongoose_1.SchemaFactory.createForClass(Announcement);
//# sourceMappingURL=announcement.schema.js.map