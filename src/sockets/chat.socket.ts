import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { MessageService } from '../services/message.service';

const messageService = new MessageService();

interface IUserSocket {
  userId: string;
  socketId: string;
}

const users: IUserSocket[] = [];

export const setupChatSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('🔌 Novo cliente conectado:', socket.id);

    // Autenticação inicial via token JWT
    socket.on('authenticate', (token: string) => {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        users.push({ userId: decoded.id, socketId: socket.id });
        console.log(`✅ Usuário ${decoded.id} autenticado no socket`);
      } catch {
        socket.emit('auth_error', 'Token inválido');
      }
    });

    // Envio de mensagens
    socket.on('send_message', async (data) => {
      console.log('📩 Dados recebidos:', data);

      const { token, receiverId, content } = data;

      // Validação básica
      if (!content || !receiverId) {
        return socket.emit('error', 'Mensagem inválida.');
      }

      try {
        // Valida o token do usuário
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const senderId = decoded.id;

        // Cria e salva a mensagem
        const message = await messageService.createMessage(senderId, receiverId, content);

        // Envia para o destinatário (se online)
        const receiver = users.find((u) => u.userId === receiverId);
        if (receiver) {
          io.to(receiver.socketId).emit('receive_message', message);
        }

        // Confirma para o remetente
        socket.emit('message_sent', message);
      } catch (err) {
        console.error('❌ Erro ao enviar mensagem:', err);
        socket.emit('error', 'Falha ao enviar mensagem.');
      }
    });

    // Desconexão do usuário
    socket.on('disconnect', () => {
      const index = users.findIndex((u) => u.socketId === socket.id);
      if (index !== -1) users.splice(index, 1);
      console.log('🔌 Usuário desconectado:', socket.id);
    });
  });
};
