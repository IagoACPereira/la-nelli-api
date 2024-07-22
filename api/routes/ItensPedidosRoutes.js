import { Router } from 'express';
import { body } from 'express-validator';
import ItensPedidosController from '../controllers/ItensPedidosController.js';

const itensPedidosRouter = Router();

itensPedidosRouter
  .post('/itens-pedidos/', [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('idPedido').notEmpty().withMessage('Campo Pedido é obrigatório'),
    body('idPedido').isNumeric().withMessage('Campo Pedido deve ser numérico'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idProduto').isNumeric().withMessage('Campo Produto deve ser numérico'),
  ], ItensPedidosController.adicionar)
  .get('/itens-pedidos/', ItensPedidosController.exibirTodos)
  .get('/itens-pedidos/:id', ItensPedidosController.exibirUm)
  .put('/itens-pedidos/:id', [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('idPedido').notEmpty().withMessage('Campo Pedido é obrigatório'),
    body('idPedido').isNumeric().withMessage('Campo Pedido deve ser numérico'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idProduto').isNumeric().withMessage('Campo Produto deve ser numérico'),
  ], ItensPedidosController.atualizar)
  .delete('/itens-pedidos/:id', ItensPedidosController.deletar);

export default itensPedidosRouter;
