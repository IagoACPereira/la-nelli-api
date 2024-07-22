import { Router } from 'express';
import { body } from 'express-validator';
import ClientesController from '../controllers/ClientesController.js';
import autenticacao from '../middlewares/autenticacao.js';

const clientesRouter = Router();

clientesRouter
  .post('/clientes/', autenticacao, [
    body('nome').notEmpty().withMessage('Campo Nome é obrigatório'),
    body('telefone').notEmpty().withMessage('Campo Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Campo Email é obrigatório'),
    body('email').isEmail().withMessage('Campo Email tem de ser um email válido'),
    body('endereco').notEmpty().withMessage('Campo Endereco é obrigatório'),
  ], ClientesController.adicionar)
  .get('/clientes/', autenticacao, ClientesController.exibirTodos)
  .get('/clientes/:id', autenticacao, ClientesController.exibirUm)
  .put('/clientes/:id', autenticacao, [
    body('nome').notEmpty().withMessage('Campo Nome é obrigatório'),
    body('telefone').notEmpty().withMessage('Campo Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Campo Email é obrigatório'),
    body('email').isEmail().withMessage('Campo Email tem de ser um email válido'),
    body('endereco').notEmpty().withMessage('Campo Endereco é obrigatório'),
  ], ClientesController.atualizar)
  .delete('/clientes/:id', autenticacao, ClientesController.deletar);

export default clientesRouter;
