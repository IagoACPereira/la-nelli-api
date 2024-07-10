import { Router } from 'express';
import CargosFuncionariosController from '../controllers/CargosFuncionariosController.js';

const cargosFuncionariosRouter = Router();

cargosFuncionariosRouter
  .post('/cargos-funcionarios/', CargosFuncionariosController.adicionar)
  .get('/cargos-funcionarios/', CargosFuncionariosController.exibirTodos)
  .get('/cargos-funcionarios/:id', CargosFuncionariosController.exibirUm)
  .put('/cargos-funcionarios/:id', CargosFuncionariosController.atualizar)
  .delete('/cargos-funcionarios/:id', CargosFuncionariosController.deletar);

export default cargosFuncionariosRouter;
