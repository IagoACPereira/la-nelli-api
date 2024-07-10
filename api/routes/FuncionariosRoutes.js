import { Router } from 'express';
import FuncionariosController from '../controllers/FuncionariosController.js';

const funcionariosRouter = Router();

funcionariosRouter
  .post('/funcionarios/', FuncionariosController.adicionar)
  .get('/funcionarios/', FuncionariosController.exibirTodos)
  .get('/funcionarios/:id', FuncionariosController.exibirUm)
  .put('/funcionarios/:id', FuncionariosController.atualizar)
  .delete('/funcionarios/:id', FuncionariosController.deletar);

export default funcionariosRouter;
