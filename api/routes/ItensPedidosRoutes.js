import { Router } from 'express';
import ItensPedidosController from '../controllers/ItensPedidosController.js';

const itensPedidosRouter = Router();

itensPedidosRouter
  .post('/itens-pedidos/', ItensPedidosController.adicionar)
  .get('/itens-pedidos/', ItensPedidosController.exibirTodos)
  .get('/itens-pedidos/:id', ItensPedidosController.exibirUm)
  .put('/itens-pedidos/:id', ItensPedidosController.atualizar)
  .delete('/itens-pedidos/:id', ItensPedidosController.deletar);

export default itensPedidosRouter;
