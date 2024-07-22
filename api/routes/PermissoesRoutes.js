import { Router } from 'express';
import { body } from 'express-validator';
import PermissoesController from '../controllers/PermissoesController.js';

const permissoesRouter = Router();

permissoesRouter
  .post('/permissoes/', [
    body('titulo').notEmpty().withMessage('Campo Título é obrigatório'),
    body('descricao').notEmpty().withMessage('Campo Descrição é obrigatório'),
  ], PermissoesController.adicionar)
  .get('/permissoes/', PermissoesController.exibirTodos)
  .get('/permissoes/:id', PermissoesController.exibirUm)
  .put('/permissoes/:id', [
    body('titulo').notEmpty().withMessage('Campo Título é obrigatório'),
    body('descricao').notEmpty().withMessage('Campo Descrição é obrigatório'),
  ], PermissoesController.atualizar)
  .delete('/permissoes/:id', PermissoesController.deletar);

export default permissoesRouter;
