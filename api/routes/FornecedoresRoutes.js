import { Router } from 'express';
import { body } from 'express-validator';
import FornecedoresController from '../controllers/FornecedoresController.js';
import autenticacao from '../middlewares/autenticacao.js';

const fornecedores = Router();

fornecedores
  .post('/fornecedores/', autenticacao, [
    body('nome').notEmpty().withMessage('Campo Nome é obrigatório'),
    body('telefone').notEmpty().withMessage('Campo Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Campo Email é obrigatório'),
    body('email').isEmail().withMessage('Campo Email tem de ser um email válido'),
    body('endereco').notEmpty().withMessage('Campo Endereco é obrigatório'),
  ], FornecedoresController.adicionar)
  .get('/fornecedores/', autenticacao, FornecedoresController.exibirTodos)
  .get('/fornecedores/:id', autenticacao, FornecedoresController.exibirUm)
  .put('/fornecedores/:id', autenticacao, [
    body('nome').notEmpty().withMessage('Campo Nome é obrigatório'),
    body('telefone').notEmpty().withMessage('Campo Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Campo Email é obrigatório'),
    body('email').isEmail().withMessage('Campo Email tem de ser um email válido'),
    body('endereco').notEmpty().withMessage('Campo Endereco é obrigatório'),
  ], FornecedoresController.atualizar)
  .delete('/fornecedores/:id', autenticacao, FornecedoresController.deletar);

export default fornecedores;
