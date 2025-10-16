import { Router } from 'express';
import {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  toggleLike,
  addComment
} from '../controllers/post.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Endpoints do sistema de postagens e feed da comunidade DevConnect
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB
 *         userId:
 *           type: string
 *           description: ID do usuário autor do post
 *         content:
 *           type: string
 *           description: Conteúdo textual da postagem
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de IDs de usuários que curtiram o post
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               text:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *           description: Comentários adicionados ao post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Cria uma nova postagem
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Primeira postagem no DevConnect 🚀"
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Erro de validação
 */
router.post('/', authMiddleware, createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lista todas as postagens do feed global
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de postagens retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', authMiddleware, getAllPosts);

/**
 * @swagger
 * /api/posts/me:
 *   get:
 *     summary: Lista todas as postagens do usuário autenticado
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de postagens do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/me', authMiddleware, getMyPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Deleta uma postagem pelo ID (apenas o autor pode excluir)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       400:
 *         description: Acesso negado ou erro na exclusão
 */
router.delete('/:id', authMiddleware, deletePost);

/**
 * @swagger
 * /api/posts/{id}/like:
 *   post:
 *     summary: Alterna curtida/descurtida em um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post a ser curtido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso (curtida ou remoção de curtida)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Erro ao processar a ação
 */
router.post('/:id/like', authMiddleware, toggleLike);

/**
 * @swagger
 * /api/posts/{id}/comment:
 *   post:
 *     summary: Adiciona um comentário a uma postagem
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post onde o comentário será adicionado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Excelente conteúdo, parabéns!"
 *     responses:
 *       200:
 *         description: Comentário adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Erro ao adicionar comentário
 */
router.post('/:id/comment', authMiddleware, addComment);

export default router;
