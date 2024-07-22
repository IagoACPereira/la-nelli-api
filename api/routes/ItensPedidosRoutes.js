import { Router } from 'express';
import { body } from 'express-validator';
import ItensPedidosController from '../controllers/ItensPedidosController.js';
import autenticacao from '../middlewares/autenticacao.js';
import permissao from '../middlewares/permissao.js';

const itensPedidosRouter = Router();

itensPedidosRouter
  .post('/itens-pedidos/', autenticacao, permissao(['admin']), [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('idPedido').notEmpty().withMessage('Campo Pedido é obrigatório'),
    body('idPedido').isNumeric().withMessage('Campo Pedido deve ser numérico'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idProduto').isNumeric().withMessage('Campo Produto deve ser numérico'),
  ], ItensPedidosController.adicionar)
  .get('/itens-pedidos/', autenticacao, permissao(['admin', 'leitura']), ItensPedidosController.exibirTodos)
  .get('/itens-pedidos/:id', autenticacao, permissao(['admin', 'leitura']), ItensPedidosController.exibirUm)
  .put('/itens-pedidos/:id', autenticacao, permissao(['admin']), [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('idPedido').notEmpty().withMessage('Campo Pedido é obrigatório'),
    body('idPedido').isNumeric().withMessage('Campo Pedido deve ser numérico'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idProduto').isNumeric().withMessage('Campo Produto deve ser numérico'),
  ], ItensPedidosController.atualizar)
  .delete('/itens-pedidos/:id', autenticacao, permissao(['admin']), ItensPedidosController.deletar);

export default itensPedidosRouter;
