import { Router } from 'express';
import { body } from 'express-validator';
import CargosFuncionariosController from '../controllers/CargosFuncionariosController.js';

const cargosFuncionariosRouter = Router();

cargosFuncionariosRouter
  .post('/cargos-funcionarios/', [
    body('cargo').notEmpty().withMessage('Campo Cargo é obrigatório'),
  ], CargosFuncionariosController.adicionar)
  .get('/cargos-funcionarios/', CargosFuncionariosController.exibirTodos)
  .get('/cargos-funcionarios/:id', CargosFuncionariosController.exibirUm)
  .put('/cargos-funcionarios/:id', [
    body('cargo').notEmpty().withMessage('Campo Cargo é obrigatório'),
  ], CargosFuncionariosController.atualizar)
  .delete('/cargos-funcionarios/:id', CargosFuncionariosController.deletar);

export default cargosFuncionariosRouter;
