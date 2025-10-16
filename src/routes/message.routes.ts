import { Router } from 'express';
import { getConversation } from '../controllers/message.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Mensagens diretas entre desenvolvedores
 */

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Retorna a conversa entre o usuário autenticado e outro dev
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do outro usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de mensagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   senderId:
 *                     type: string
 *                   receiverId:
 *                     type: string
 *                   text:
 *                     type: string
 *                   createdAt:
 *                     type: string
 */
router.get('/:id', authMiddleware, getConversation);

export default router;
