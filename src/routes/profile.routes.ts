import { Router } from 'express';
import { createProfile, getMyProfile, updateProfile } from '../controllers/profile.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Gerenciamento de perfis dos desenvolvedores
 */

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Cria um novo perfil de desenvolvedor
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bio
 *             properties:
 *               bio:
 *                 type: string
 *                 example: Desenvolvedor backend apaixonado por Node.js
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Node.js", "TypeScript", "MongoDB"]
 *               github:
 *                 type: string
 *                 example: https://github.com/neymarjr
 *               linkedin:
 *                 type: string
 *                 example: https://linkedin.com/in/neymarjr
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/', authMiddleware, createProfile);

/**
 * @swagger
 * /api/profiles/me:
 *   get:
 *     summary: Retorna o perfil do usuário autenticado
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *                 github:
 *                   type: string
 *                 linkedin:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *       404:
 *         description: Perfil não encontrado
 */
router.get('/me', authMiddleware, getMyProfile);

/**
 * @swagger
 * /api/profiles/me:
 *   put:
 *     summary: Atualiza o perfil do usuário autenticado
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 example: Atualizei minha bio 🚀
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Node.js", "React", "Docker"]
 *               github:
 *                 type: string
 *               linkedin:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *       400:
 *         description: Erro na atualização
 */
router.put('/me', authMiddleware, updateProfile);

export default router;
