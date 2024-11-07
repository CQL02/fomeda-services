"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SessionSchema = new mongoose_1.Schema({
    session_id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true },
    expires_at: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
});
//# sourceMappingURL=session.schema.js.map