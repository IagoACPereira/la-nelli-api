import { Router } from 'express';
import { body } from 'express-validator';
import PedidosController from '../controllers/PedidosController.js';

const clientesRouter = Router();

clientesRouter
  .post('/pedidos/', [
    body('dataPedido').notEmpty().withMessage('Campo Data do Pedido é obrigatório'),
    body('dataPedido').isDate().withMessage('Campo Data do Pedido deve ser uma data válida: aaa-mm-dd'),
    body('total').notEmpty().withMessage('Campo Total é obrigatório'),
    body('total').isNumeric().withMessage('Campo Total deve ser numérico'),
    body('idCliente').notEmpty().withMessage('Campo Cliente é obrigatório'),
    body('idCliente').isNumeric().withMessage('Campo Cliente deve ser numérico'),
  ], PedidosController.adicionar)
  .get('/pedidos/', PedidosController.exibirTodos)
  .get('/pedidos/:id', PedidosController.exibirUm)
  .put('/pedidos/:id', [
    body('dataPedido').notEmpty().withMessage('Campo Data do Pedido é obrigatório'),
    body('dataPedido').isDate().withMessage('Campo Data do Pedido deve ser uma data válida: aaa-mm-dd'),
    body('total').notEmpty().withMessage('Campo Total é obrigatório'),
    body('total').isNumeric().withMessage('Campo Total deve ser numérico'),
    body('idCliente').notEmpty().withMessage('Campo Cliente é obrigatório'),
    body('idCliente').isNumeric().withMessage('Campo Cliente deve ser numérico'),
  ], PedidosController.atualizar)
  .delete('/pedidos/:id', PedidosController.deletar);

export default clientesRouter;
