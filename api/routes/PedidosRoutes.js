import { Router } from 'express';
import { body } from 'express-validator';
import PedidosController from '../controllers/PedidosController.js';
import autenticacao from '../middlewares/autenticacao.js';
import permissao from '../middlewares/permissao.js';

const clientesRouter = Router();

clientesRouter
  .post('/pedidos/', autenticacao, permissao(['admin']), [
    body('dataPedido').notEmpty().withMessage('Campo Data do Pedido é obrigatório'),
    body('dataPedido').isDate().withMessage('Campo Data do Pedido deve ser uma data válida: aaa-mm-dd'),
    body('total').notEmpty().withMessage('Campo Total é obrigatório'),
    body('total').isNumeric().withMessage('Campo Total deve ser numérico'),
    body('idCliente').notEmpty().withMessage('Campo Cliente é obrigatório'),
    body('idCliente').isNumeric().withMessage('Campo Cliente deve ser numérico'),
  ], PedidosController.adicionar)
  .get('/pedidos/', autenticacao, permissao(['admin', 'leitura']), PedidosController.exibirTodos)
  .get('/pedidos/:id', autenticacao, permissao(['admin', 'leitura']), PedidosController.exibirUm)
  .put('/pedidos/:id', autenticacao, permissao(['admin']), [
    body('dataPedido').notEmpty().withMessage('Campo Data do Pedido é obrigatório'),
    body('dataPedido').isDate().withMessage('Campo Data do Pedido deve ser uma data válida: aaa-mm-dd'),
    body('total').notEmpty().withMessage('Campo Total é obrigatório'),
    body('total').isNumeric().withMessage('Campo Total deve ser numérico'),
    body('idCliente').notEmpty().withMessage('Campo Cliente é obrigatório'),
    body('idCliente').isNumeric().withMessage('Campo Cliente deve ser numérico'),
  ], PedidosController.atualizar)
  .delete('/pedidos/:id', autenticacao, permissao(['admin']), PedidosController.deletar);

export default clientesRouter;
