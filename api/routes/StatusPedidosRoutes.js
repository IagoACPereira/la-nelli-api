import { Router } from 'express';
import StatusPedidosController from '../controllers/StatusPedidosController.js';

const statusPedidosRouter = Router();

statusPedidosRouter
  .post('/status-pedidos/', StatusPedidosController.adicionar)
  .get('/status-pedidos/', StatusPedidosController.exibirTodos)
  .get('/status-pedidos/:id', StatusPedidosController.exibirUm)
  .put('/status-pedidos/:id', StatusPedidosController.atualizar)
  .delete('/status-pedidos/:id', StatusPedidosController.deletar);

export default statusPedidosRouter;
