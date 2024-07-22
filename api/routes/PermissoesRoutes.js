import { Router } from 'express';
import { body } from 'express-validator';
import PermissoesController from '../controllers/PermissoesController.js';
import autenticacao from '../middlewares/autenticacao.js';

const permissoesRouter = Router();

permissoesRouter
  .post('/permissoes/', autenticacao, [
    body('titulo').notEmpty().withMessage('Campo Título é obrigatório'),
    body('descricao').notEmpty().withMessage('Campo Descrição é obrigatório'),
  ], PermissoesController.adicionar)
  .get('/permissoes/', autenticacao, PermissoesController.exibirTodos)
  .get('/permissoes/:id', autenticacao, PermissoesController.exibirUm)
  .put('/permissoes/:id', autenticacao, [
    body('titulo').notEmpty().withMessage('Campo Título é obrigatório'),
    body('descricao').notEmpty().withMessage('Campo Descrição é obrigatório'),
  ], PermissoesController.atualizar)
  .delete('/permissoes/:id', autenticacao, PermissoesController.deletar);

export default permissoesRouter;
