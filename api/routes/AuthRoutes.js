import { Router } from 'express';
import { body } from 'express-validator';
import AuthController from '../controllers/AuthController.js';

const authRouter = Router();

authRouter
  .post('/auth/', [
    body('email').notEmpty().withMessage('Campo Email é obrigatório'),
    body('email').isEmail().withMessage('Campo Email deve ser um email válido'),
    body('senha').notEmpty().withMessage('Campo Senha é obrigatório'),
  ], AuthController.auth);

export default authRouter;
