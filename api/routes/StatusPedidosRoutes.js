import { Router } from 'express';
import { body } from 'express-validator';
import StatusPedidosController from '../controllers/StatusPedidosController.js';
import autenticacao from '../middlewares/autenticacao.js';

const statusPedidosRouter = Router();

statusPedidosRouter
  .post('/status-pedidos/', autenticacao, [
    body('status').notEmpty().withMessage('Campo Status é obrigatório'),
  ], StatusPedidosController.adicionar)
  .get('/status-pedidos/', autenticacao, StatusPedidosController.exibirTodos)
  .get('/status-pedidos/:id', autenticacao, StatusPedidosController.exibirUm)
  .put('/status-pedidos/:id', autenticacao, [
    body('status').notEmpty().withMessage('Campo Status é obrigatório'),
  ], StatusPedidosController.atualizar)
  .delete('/status-pedidos/:id', autenticacao, StatusPedidosController.deletar);

export default statusPedidosRouter;
