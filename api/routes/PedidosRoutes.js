import { Router } from 'express';
import { body } from 'express-validator';
import PedidosController from '../controllers/PedidosController.js';
import autenticacao from '../middlewares/autenticacao.js';

const clientesRouter = Router();

clientesRouter
  .post('/pedidos/', autenticacao, [
    body('dataPedido').notEmpty().withMessage('Campo Data do Pedido é obrigatório'),
    body('dataPedido').isDate().withMessage('Campo Data do Pedido deve ser uma data válida: aaa-mm-dd'),
    body('total').notEmpty().withMessage('Campo Total é obrigatório'),
    body('total').isNumeric().withMessage('Campo Total deve ser numérico'),
    body('idCliente').notEmpty().withMessage('Campo Cliente é obrigatório'),
    body('idCliente').isNumeric().withMessage('Campo Cliente deve ser numérico'),
  ], PedidosController.adicionar)
  .get('/pedidos/', autenticacao, PedidosController.exibirTodos)
  .get('/pedidos/:id', autenticacao, PedidosController.exibirUm)
  .put('/pedidos/:id', autenticacao, [
    body('dataPedido').notEmpty().withMessage('Campo Data do Pedido é obrigatório'),
    body('dataPedido').isDate().withMessage('Campo Data do Pedido deve ser uma data válida: aaa-mm-dd'),
    body('total').notEmpty().withMessage('Campo Total é obrigatório'),
    body('total').isNumeric().withMessage('Campo Total deve ser numérico'),
    body('idCliente').notEmpty().withMessage('Campo Cliente é obrigatório'),
    body('idCliente').isNumeric().withMessage('Campo Cliente deve ser numérico'),
  ], PedidosController.atualizar)
  .delete('/pedidos/:id', autenticacao, PedidosController.deletar);

export default clientesRouter;
