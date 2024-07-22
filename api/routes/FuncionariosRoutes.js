import { Router } from 'express';
import { body } from 'express-validator';
import FuncionariosController from '../controllers/FuncionariosController.js';
import autenticacao from '../middlewares/autenticacao.js';
import permissao from '../middlewares/permissao.js';

const funcionariosRouter = Router();

funcionariosRouter
  .post('/funcionarios/', autenticacao, permissao(['admin']), [
    body('nome').notEmpty().withMessage('Campo Nome é obrigatório'),
    body('telefone').notEmpty().withMessage('Campo Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Campo Email é obrigatório'),
    body('email').isEmail().withMessage('Campo Email tem de ser um email válido'),
    body('senha').notEmpty().withMessage('Campo Senha é obrigatório'),
    body('senha').isStrongPassword().withMessage('Campo Senha deve ser uma senha forte'),
    body('confirmacaoSenha').notEmpty().withMessage('Campo Confirmação Senha é obrigatório'),
    body('salario').notEmpty().withMessage('Campo Salario é obrigatório'),
    body('dataContratacao').notEmpty().withMessage('Campo Data de Contratação é obrigatório'),
    body('dataContratacao').isDate().withMessage('Campo Data de Contratação deve ser uma data válida: aaa-mm-dd'),
    body('idCargo').notEmpty().withMessage('Campo Cargo é obrigatório'),
    body('idCargo').isNumeric().withMessage('Campo Cargo deve ser numérico'),
  ], FuncionariosController.adicionar)
  .get('/funcionarios/', autenticacao, permissao(['admin', 'leitura', 'manipulacao']), FuncionariosController.exibirTodos)
  .get('/funcionarios/:id', autenticacao, permissao(['admin', 'leitura', 'manipulacao']), FuncionariosController.exibirUm)
  .put('/funcionarios/:id', autenticacao, permissao(['admin', 'manipulacao']), [
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
  .delete('/funcionarios/:id', autenticacao, permissao(['admin']), FuncionariosController.deletar);

export default funcionariosRouter;
