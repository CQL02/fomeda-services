import { Schema, Document } from 'mongoose';

export interface Session extends Document {
  session_id: string;
  user_id: string;
  expires_at: Date;
  created_at: Date;
}

export const SessionSchema = new Schema<Session>({
  session_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  expires_at: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});
