import { Router } from 'express';
import { body } from 'express-validator';
import PedidosController from '../controllers/PedidosController.js';

const clientesRouter = Router();

clientesRouter
  .post('/pedidos/', [
    body('dataPedido').notEmpty().withMessage('Campo Data do Pedido é obrigatório'),
    body('total').notEmpty().withMessage('Campo Total é obrigatório'),
    body('idCliente').notEmpty().withMessage('Campo Cliente é obrigatório'),
  ], PedidosController.adicionar)
  .get('/pedidos/', PedidosController.exibirTodos)
  .get('/pedidos/:id', PedidosController.exibirUm)
  .put('/pedidos/:id', [
    body('dataPedido').notEmpty().withMessage('Campo Data do Pedido é obrigatório'),
    body('total').notEmpty().withMessage('Campo Total é obrigatório'),
    body('idCliente').notEmpty().withMessage('Campo Cliente é obrigatório'),
  ], PedidosController.atualizar)
  .delete('/pedidos/:id', PedidosController.deletar);

export default clientesRouter;
