import { Router } from 'express';
import { body } from 'express-validator';
import ItensPedidosController from '../controllers/ItensPedidosController.js';
import autenticacao from '../middlewares/autenticacao.js';

const itensPedidosRouter = Router();

itensPedidosRouter
  .post('/itens-pedidos/', autenticacao, [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('idPedido').notEmpty().withMessage('Campo Pedido é obrigatório'),
    body('idPedido').isNumeric().withMessage('Campo Pedido deve ser numérico'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idProduto').isNumeric().withMessage('Campo Produto deve ser numérico'),
  ], ItensPedidosController.adicionar)
  .get('/itens-pedidos/', autenticacao, ItensPedidosController.exibirTodos)
  .get('/itens-pedidos/:id', autenticacao, ItensPedidosController.exibirUm)
  .put('/itens-pedidos/:id', autenticacao, [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('idPedido').notEmpty().withMessage('Campo Pedido é obrigatório'),
    body('idPedido').isNumeric().withMessage('Campo Pedido deve ser numérico'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idProduto').isNumeric().withMessage('Campo Produto deve ser numérico'),
  ], ItensPedidosController.atualizar)
  .delete('/itens-pedidos/:id', autenticacao, ItensPedidosController.deletar);

export default itensPedidosRouter;
