import { Router } from 'express';
import PedidosController from '../controllers/PedidosController.js';

const clientesRouter = Router();

clientesRouter
  .post('/pedidos/', PedidosController.adicionar)
  .get('/pedidos/', PedidosController.exibirTodos)
  .get('/pedidos/:id', PedidosController.exibirUm)
  .put('/pedidos/:id', PedidosController.atualizar)
  .delete('/pedidos/:id', PedidosController.deletar);

export default clientesRouter;
