import { Request, Response } from 'express';
import { MessageService } from '../services/message.service';

const messageService = new MessageService();

export const getConversation = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id: otherId } = req.params;
    const messages = await messageService.getConversation(userId, otherId as string);
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
