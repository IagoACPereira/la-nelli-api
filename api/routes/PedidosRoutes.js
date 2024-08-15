import { Router } from 'express';
import { body } from 'express-validator';
import PedidosController from '../controllers/PedidosController.js';
import autenticacao from '../middlewares/autenticacao.js';
import permissao from '../middlewares/permissao.js';

const clientesRouter = Router();

clientesRouter
  .post('/pedidos/', autenticacao, permissao(['admin']), [
    body('dataPedido').notEmpty().withMessage('Campo Data do Pedido é obrigatório'),
    body('dataPedido').isDate().withMessage('Campo Data do Pedido deve ser uma data válida: aaaa-mm-dd'),
    body('horaPedido').notEmpty().withMessage('Campo Horário do pedido é obrigatório'),
    body('horaPedido').isTime().withMessage('Campo Horário do pedido deve ser um horário válido: hh:mm'),
    body('idCliente').notEmpty().withMessage('Campo Cliente é obrigatório'),
    body('idCliente').isNumeric().withMessage('Campo Cliente deve ser numérico'),
  ], PedidosController.adicionar)
  .get('/pedidos/', autenticacao, permissao(['admin', 'leitura', 'manipulacao']), PedidosController.exibirTodos)
  .get('/pedidos/:id', autenticacao, permissao(['admin', 'leitura', 'manipulacao']), PedidosController.exibirUm)
  .put('/pedidos/:id', autenticacao, permissao(['admin', 'manipulacao']), [
    body('dataPedido').notEmpty().withMessage('Campo Data do Pedido é obrigatório'),
    body('dataPedido').isDate().withMessage('Campo Data do Pedido deve ser uma data válida: aaaa-mm-dd'),
    body('horaPedido').notEmpty().withMessage('Campo Horário do pedido é obrigatório'),
    body('horaPedido').isTime().withMessage('Campo Horário do pedido deve ser um horário válido: hh:mm'),
    body('idCliente').notEmpty().withMessage('Campo Cliente é obrigatório'),
    body('idCliente').isNumeric().withMessage('Campo Cliente deve ser numérico'),
  ], PedidosController.atualizar)
  .put('/pedidos/finalizar/:id', autenticacao, permissao(['admin', 'manipulacao']), PedidosController.finalizarPedido)
  .put('/pedidos/cancelar/:id', autenticacao, permissao(['admin', 'manipulacao']), PedidosController.cancelarPedido)
  .delete('/pedidos/:id', autenticacao, permissao(['admin']), PedidosController.deletar);

export default clientesRouter;
