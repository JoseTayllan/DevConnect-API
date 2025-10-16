import { Schema, model, Document } from 'mongoose';

export interface IComment {
  userId: string;
  text: string;
  createdAt: Date;
}

export interface IPost extends Document {
  userId: string;
  content: string;
  likes: string[];
  comments: IComment[];
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new Schema<IPost>({
  userId: { type: String, required: true, ref: 'User' },
  content: { type: String, required: true },
  likes: { type: [String], default: [] },
  comments: { type: [commentSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default model<IPost>('Post', postSchema);
