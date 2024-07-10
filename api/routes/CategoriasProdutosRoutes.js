import { Router } from 'express';
import CategoriasProdutosController from '../controllers/CategoriasProdutosController.js';

const categoriasProdutosRouter = Router();

categoriasProdutosRouter
  .post('/categorias-produtos/', CategoriasProdutosController.adicionar)
  .get('/categorias-produtos/', CategoriasProdutosController.exibirTodos)
  .get('/categorias-produtos/:id', CategoriasProdutosController.exibirUm)
  .put('/categorias-produtos/:id', CategoriasProdutosController.atualizar)
  .delete('/categorias-produtos/:id', CategoriasProdutosController.deletar);

export default categoriasProdutosRouter;
