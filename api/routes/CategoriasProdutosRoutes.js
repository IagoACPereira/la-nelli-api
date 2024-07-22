import { Router } from 'express';
import { body } from 'express-validator';
import CategoriasProdutosController from '../controllers/CategoriasProdutosController.js';
import autenticacao from '../middlewares/autenticacao.js';

const categoriasProdutosRouter = Router();

categoriasProdutosRouter
  .post('/categorias-produtos/', autenticacao, [
    body('categoria').notEmpty().withMessage('Campo Categoria é obrigatório'),
  ], CategoriasProdutosController.adicionar)
  .get('/categorias-produtos/', autenticacao, CategoriasProdutosController.exibirTodos)
  .get('/categorias-produtos/:id', autenticacao, CategoriasProdutosController.exibirUm)
  .put('/categorias-produtos/:id', autenticacao, [
    body('categoria').notEmpty().withMessage('Campo Categoria é obrigatório'),
  ], CategoriasProdutosController.atualizar)
  .delete('/categorias-produtos/:id', autenticacao, CategoriasProdutosController.deletar);

export default categoriasProdutosRouter;
