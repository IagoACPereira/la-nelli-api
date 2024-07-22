import { Router } from 'express';
import { body } from 'express-validator';
import FuncionariosController from '../controllers/FuncionariosController.js';

const funcionariosRouter = Router();

funcionariosRouter
  .post('/funcionarios/', [
    body('nome').notEmpty().withMessage('Campo Nome é obrigatório'),
    body('telefone').notEmpty().withMessage('Campo Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Campo Email é obrigatório'),
    body('email').isEmail().withMessage('Campo Email tem de ser um email válido'),
    body('salario').notEmpty().withMessage('Campo Salario é obrigatório'),
    body('dataContratacao').notEmpty().withMessage('Campo Data de Contratação é obrigatório'),
    body('dataContratacao').isDate().withMessage('Campo Data de Contratação deve ser uma data válida: aaa-mm-dd'),
    body('idCargo').notEmpty().withMessage('Campo Cargo é obrigatório'),
    body('idCargo').isNumeric().withMessage('Campo Cargo deve ser numérico'),
  ], FuncionariosController.adicionar)
  .get('/funcionarios/', FuncionariosController.exibirTodos)
  .get('/funcionarios/:id', FuncionariosController.exibirUm)
  .put('/funcionarios/:id', [
    body('nome').notEmpty().withMessage('Campo Nome é obrigatório'),
    body('telefone').notEmpty().withMessage('Campo Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Campo Email é obrigatório'),
    body('email').isEmail().withMessage('Campo Email tem de ser um email válido'),
    body('salario').notEmpty().withMessage('Campo Salario é obrigatório'),
    body('dataContratacao').notEmpty().withMessage('Campo Data de Contratação é obrigatório'),
    body('dataContratacao').isDate().withMessage('Campo Data de Contratação deve ser uma data válida: aaa-mm-dd'),
    body('idCargo').notEmpty().withMessage('Campo Cargo é obrigatório'),
    body('idCargo').isNumeric().withMessage('Campo Cargo deve ser numérico'),
  ], FuncionariosController.atualizar)
  .delete('/funcionarios/:id', FuncionariosController.deletar);

export default funcionariosRouter;
