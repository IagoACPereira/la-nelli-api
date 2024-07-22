import { Router } from 'express';
import { body } from 'express-validator';
import ProdutosFornecedoresController from '../controllers/ProdutosFornecedoresController.js';
import autenticacao from '../middlewares/autenticacao.js';

const produtosForncedoresRouter = Router();

produtosForncedoresRouter
  .post('/produtos-fornecedores/', autenticacao, [
    body('idFornecedor').notEmpty().withMessage('Campo Fornecedor é obrigatório'),
    body('idFornecedor').isNumeric().withMessage('Campo Fornecedor deve ser numérico'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idProduto').isNumeric().withMessage('Campo Produto deve ser numérico'),
  ], ProdutosFornecedoresController.adicionar)
  .get('/produtos-fornecedores/', autenticacao, ProdutosFornecedoresController.exibirTodos)
  .get('/produtos-fornecedores/:id', autenticacao, ProdutosFornecedoresController.exibirUm)
  .put('/produtos-fornecedores/:id', autenticacao, [
    body('idFornecedor').notEmpty().withMessage('Campo Fornecedor é obrigatório'),
    body('idFornecedor').isNumeric().withMessage('Campo Fornecedor deve ser numérico'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idProduto').isNumeric().withMessage('Campo Produto deve ser numérico'),
  ], ProdutosFornecedoresController.atualizar)
  .delete('/produtos-fornecedores/:id', autenticacao, ProdutosFornecedoresController.deletar);

export default produtosForncedoresRouter;
