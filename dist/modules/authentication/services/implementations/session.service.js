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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto = require("crypto");
let SessionService = class SessionService {
    constructor(sessionModel) {
        this.sessionModel = sessionModel;
    }
    async findSessionByUserId(userId) {
        return this.sessionModel.findOne({ user_id: userId });
    }
    async findSessionIdByUserId(userId) {
        const result = await this.sessionModel.findOne({ user_id: userId });
        return result?.session_id;
    }
    async createSession(userId) {
        const sessionId = crypto.randomBytes(16).toString('hex');
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        const sessionData = {
            session_id: sessionId,
            user_id: userId,
            created_at: new Date(),
            expires_at: expiresAt,
        };
        await this.sessionModel.create(sessionData);
        return sessionId;
    }
    async updateSession(sessionId) {
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 15);
        await this.sessionModel.updateOne({ session_id: sessionId }, { expires_at: expiresAt });
        return sessionId;
    }
    async validateSession(sessionId) {
        const session = await this.sessionModel.findOne({ session_id: sessionId });
        if (session && session.expires_at > new Date()) {
            return session.user_id;
        }
        return null;
    }
    async deleteSession(sessionId) {
        await this.sessionModel.deleteOne({ session_id: sessionId });
    }
    async deleteExpiredSessions() {
        await this.sessionModel.deleteMany({ expires_at: { $lt: new Date() } });
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Session')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SessionService);
//# sourceMappingURL=session.service.js.map