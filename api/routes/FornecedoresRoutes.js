import { Router } from 'express';
import { body } from 'express-validator';
import FornecedoresController from '../controllers/FornecedoresController.js';

const fornecedores = Router();

fornecedores
  .post('/fornecedores/', [
    body('nome').notEmpty().withMessage('Campo Nome é obrigatório'),
    body('telefone').notEmpty().withMessage('Campo Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Campo Email é obrigatório'),
    body('endereco').notEmpty().withMessage('Campo Endereco é obrigatório'),
  ], FornecedoresController.adicionar)
  .get('/fornecedores/', FornecedoresController.exibirTodos)
  .get('/fornecedores/:id', FornecedoresController.exibirUm)
  .put('/fornecedores/:id', [
    body('nome').notEmpty().withMessage('Campo Nome é obrigatório'),
    body('telefone').notEmpty().withMessage('Campo Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Campo Email é obrigatório'),
    body('endereco').notEmpty().withMessage('Campo Endereco é obrigatório'),
  ], FornecedoresController.atualizar)
  .delete('/fornecedores/:id', FornecedoresController.deletar);

export default fornecedores;
