import { Router } from 'express';
import { registerUser, loginUser, getAllUsers, getUserById } from '../controllers/use.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/register', registerUser);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Faz login e retorna token JWT
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Erro de autenticação
 */
router.post('/login', loginUser);

// Rotas protegidas
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);

export default router;
