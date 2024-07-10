import { Router } from 'express';
import ProdutosFornecedoresController from '../controllers/ProdutosFornecedoresController.js';

const produtosForncedoresRouter = Router();

produtosForncedoresRouter
  .post('/produtos-fornecedores/', ProdutosFornecedoresController.adicionar)
  .get('/produtos-fornecedores/', ProdutosFornecedoresController.exibirTodos)
  .get('/produtos-fornecedores/:id', ProdutosFornecedoresController.exibirUm)
  .put('/produtos-fornecedores/:id', ProdutosFornecedoresController.atualizar)
  .delete('/produtos-fornecedores/:id', ProdutosFornecedoresController.deletar);

export default produtosForncedoresRouter;
