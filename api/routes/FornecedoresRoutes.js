import { Router } from 'express';
import FornecedoresController from '../controllers/FornecedoresController.js';

const fornecedores = Router();

fornecedores
  .post('/fornecedores/', FornecedoresController.adicionar)
  .get('/fornecedores/', FornecedoresController.exibirTodos)
  .get('/fornecedores/:id', FornecedoresController.exibirUm)
  .put('/fornecedores/:id', FornecedoresController.atualizar)
  .delete('/fornecedores/:id', FornecedoresController.deletar);

export default fornecedores;
