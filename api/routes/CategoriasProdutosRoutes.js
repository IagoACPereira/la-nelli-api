import { Router } from 'express';
import { body } from 'express-validator';
import CategoriasProdutosController from '../controllers/CategoriasProdutosController.js';

const categoriasProdutosRouter = Router();

categoriasProdutosRouter
  .post('/categorias-produtos/', [
    body('categoria').notEmpty().withMessage('Campo Categoria é obrigatório'),
  ], CategoriasProdutosController.adicionar)
  .get('/categorias-produtos/', CategoriasProdutosController.exibirTodos)
  .get('/categorias-produtos/:id', CategoriasProdutosController.exibirUm)
  .put('/categorias-produtos/:id', [
    body('categoria').notEmpty().withMessage('Campo Categoria é obrigatório'),
  ], CategoriasProdutosController.atualizar)
  .delete('/categorias-produtos/:id', CategoriasProdutosController.deletar);

export default categoriasProdutosRouter;
