import Message from '../models/message.model';

export class MessageService {
    async createMessage(senderId: string, receiverId: string, content: string) {
        const message = new Message({ senderId, receiverId, content });
        await message.save();

        return message;
    }

    async getConversation(userId: string, otherId: string) {
        return await Message.find({
            $or: [
                { senderId: userId, receiverId: otherId },
                { senderId: otherId, receiverId: userId }
            ]
        }).sort({ createdAt: 1 });
    }
}