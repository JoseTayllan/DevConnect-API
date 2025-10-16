import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
    senderId: { type: String, required: true, ref: 'User' },
    receiverId: { type: String, required: true, ref: 'User' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})


export default model<IMessage>('Message', messageSchema);