import { Router } from 'express';
import { body } from 'express-validator';
import PermissoesController from '../controllers/PermissoesController.js';
import autenticacao from '../middlewares/autenticacao.js';
import permissao from '../middlewares/permissao.js';

const permissoesRouter = Router();

permissoesRouter
  .post('/permissoes/', autenticacao, permissao(['admin']), [
    body('titulo').notEmpty().withMessage('Campo Título é obrigatório'),
    body('descricao').notEmpty().withMessage('Campo Descrição é obrigatório'),
  ], PermissoesController.adicionar)
  .get('/permissoes/', autenticacao, permissao(['admin', 'leitura']), PermissoesController.exibirTodos)
  .get('/permissoes/:id', autenticacao, permissao(['admin', 'leitura']), PermissoesController.exibirUm)
  .put('/permissoes/:id', autenticacao, permissao(['admin']), [
    body('titulo').notEmpty().withMessage('Campo Título é obrigatório'),
    body('descricao').notEmpty().withMessage('Campo Descrição é obrigatório'),
  ], PermissoesController.atualizar)
  .delete('/permissoes/:id', autenticacao, permissao(['admin']), PermissoesController.deletar);

export default permissoesRouter;
