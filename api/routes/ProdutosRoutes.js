import { Router } from 'express';
import ProdutosController from '../controllers/ProdutosController.js';

const produtosRouter = Router();

produtosRouter
  .post('/produtos/', ProdutosController.adicionar)
  .get('/produtos/', ProdutosController.exibirTodos)
  .get('/produtos/:id', ProdutosController.exibirUm)
  .put('/produtos/:id', ProdutosController.atualizar)
  .delete('/produtos/:id', ProdutosController.deletar);

export default produtosRouter;
