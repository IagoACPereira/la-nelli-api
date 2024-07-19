import { Router } from 'express';
import { body } from 'express-validator';
import ItensPedidosController from '../controllers/ItensPedidosController.js';

const itensPedidosRouter = Router();

itensPedidosRouter
  .post('/itens-pedidos/', [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('idPedido').notEmpty().withMessage('Campo Pedido é obrigatório'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
  ], ItensPedidosController.adicionar)
  .get('/itens-pedidos/', ItensPedidosController.exibirTodos)
  .get('/itens-pedidos/:id', ItensPedidosController.exibirUm)
  .put('/itens-pedidos/:id', [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('idPedido').notEmpty().withMessage('Campo Pedido é obrigatório'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
  ], ItensPedidosController.atualizar)
  .delete('/itens-pedidos/:id', ItensPedidosController.deletar);

export default itensPedidosRouter;
