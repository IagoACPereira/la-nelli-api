import { Router } from 'express';
import { body } from 'express-validator';
import StatusPedidosController from '../controllers/StatusPedidosController.js';

const statusPedidosRouter = Router();

statusPedidosRouter
  .post('/status-pedidos/', [
    body('status').notEmpty().withMessage('Campo Status é obrigatório'),
  ], StatusPedidosController.adicionar)
  .get('/status-pedidos/', StatusPedidosController.exibirTodos)
  .get('/status-pedidos/:id', StatusPedidosController.exibirUm)
  .put('/status-pedidos/:id', [
    body('status').notEmpty().withMessage('Campo Status é obrigatório'),
  ], StatusPedidosController.atualizar)
  .delete('/status-pedidos/:id', StatusPedidosController.deletar);

export default statusPedidosRouter;
