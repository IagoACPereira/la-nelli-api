import { Router } from 'express';
import { body } from 'express-validator';
import StatusPedidosController from '../controllers/StatusPedidosController.js';
import autenticacao from '../middlewares/autenticacao.js';
import permissao from '../middlewares/permissao.js';

const statusPedidosRouter = Router();

statusPedidosRouter
  .post('/status-pedidos/', autenticacao, permissao(['admin']), [
    body('status').notEmpty().withMessage('Campo Status é obrigatório'),
  ], StatusPedidosController.adicionar)
  .get('/status-pedidos/', autenticacao, permissao(['admin']), StatusPedidosController.exibirTodos)
  .get('/status-pedidos/:id', autenticacao, permissao(['admin']), StatusPedidosController.exibirUm)
  .put('/status-pedidos/:id', autenticacao, permissao(['admin']), [
    body('status').notEmpty().withMessage('Campo Status é obrigatório'),
  ], StatusPedidosController.atualizar)
  .delete('/status-pedidos/:id', autenticacao, permissao(['admin']), StatusPedidosController.deletar);

export default statusPedidosRouter;
