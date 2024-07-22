import { Router } from 'express';
import { body } from 'express-validator';
import CargosFuncionariosController from '../controllers/CargosFuncionariosController.js';
import autenticacao from '../middlewares/autenticacao.js';

const cargosFuncionariosRouter = Router();

cargosFuncionariosRouter
  .post('/cargos-funcionarios/', autenticacao, [
    body('cargo').notEmpty().withMessage('Campo Cargo é obrigatório'),
  ], CargosFuncionariosController.adicionar)
  .get('/cargos-funcionarios/', autenticacao, CargosFuncionariosController.exibirTodos)
  .get('/cargos-funcionarios/:id', autenticacao, CargosFuncionariosController.exibirUm)
  .put('/cargos-funcionarios/:id', autenticacao, [
    body('cargo').notEmpty().withMessage('Campo Cargo é obrigatório'),
  ], CargosFuncionariosController.atualizar)
  .delete('/cargos-funcionarios/:id', autenticacao, CargosFuncionariosController.deletar);

export default cargosFuncionariosRouter;
