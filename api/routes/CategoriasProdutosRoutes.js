import { Router } from 'express';
import { body } from 'express-validator';
import CategoriasProdutosController from '../controllers/CategoriasProdutosController.js';
import autenticacao from '../middlewares/autenticacao.js';
import permissao from '../middlewares/permissao.js';

const categoriasProdutosRouter = Router();

categoriasProdutosRouter
  .post('/categorias-produtos/', autenticacao, permissao(['admin']), [
    body('categoria').notEmpty().withMessage('Campo Categoria é obrigatório'),
  ], CategoriasProdutosController.adicionar)
  .get('/categorias-produtos/', autenticacao, permissao(['admin', 'leitura']), CategoriasProdutosController.exibirTodos)
  .get('/categorias-produtos/:id', autenticacao, permissao(['admin', 'leitura']), CategoriasProdutosController.exibirUm)
  .put('/categorias-produtos/:id', autenticacao, permissao(['admin']), [
    body('categoria').notEmpty().withMessage('Campo Categoria é obrigatório'),
  ], CategoriasProdutosController.atualizar)
  .delete('/categorias-produtos/:id', autenticacao, permissao(['admin']), CategoriasProdutosController.deletar);

export default categoriasProdutosRouter;
