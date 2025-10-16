import { Schema, model, Document } from "mongoose";


export interface IProfile extends Document {
    userId: string;
    bio: string;
    skills: string[];
    github?: string;
    linkedin?: string;
    createdAt: Date;
}

const profileSchema = new Schema<IProfile>({
    userId: { type: String, required: true, ref: 'User' },
    bio: { type: String, required: true },
    skills: { type: [String], default:[] },
    github: { type: String },
    linkedin: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default model<IProfile>('Profile', profileSchema);