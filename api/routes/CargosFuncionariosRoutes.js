import { Router } from 'express';
import { body } from 'express-validator';
import CargosFuncionariosController from '../controllers/CargosFuncionariosController.js';
import autenticacao from '../middlewares/autenticacao.js';
import permissao from '../middlewares/permissao.js';

const cargosFuncionariosRouter = Router();

cargosFuncionariosRouter
  .post('/cargos-funcionarios/', autenticacao, permissao(['admin']), [
    body('cargo').notEmpty().withMessage('Campo Cargo é obrigatório'),
  ], CargosFuncionariosController.adicionar)
  .get('/cargos-funcionarios/', autenticacao, permissao(['admin', 'leitura']), CargosFuncionariosController.exibirTodos)
  .get('/cargos-funcionarios/:id', autenticacao, permissao(['admin', 'leitura']), CargosFuncionariosController.exibirUm)
  .put('/cargos-funcionarios/:id', autenticacao, permissao(['admin']), [
    body('cargo').notEmpty().withMessage('Campo Cargo é obrigatório'),
  ], CargosFuncionariosController.atualizar)
  .delete('/cargos-funcionarios/:id', autenticacao, permissao(['admin']), CargosFuncionariosController.deletar);

export default cargosFuncionariosRouter;
