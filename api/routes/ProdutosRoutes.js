import { Router } from 'express';
import { body } from 'express-validator';
import ProdutosController from '../controllers/ProdutosController.js';
import autenticacao from '../middlewares/autenticacao.js';
import permissao from '../middlewares/permissao.js';

const produtosRouter = Router();

produtosRouter
  .post('/produtos/', autenticacao, permissao(['admin']), [
    body('nome').notEmpty().withMessage('Campo nome é obrigatório'),
    body('descricao').notEmpty().withMessage('Campo Descricao é obrigatório'),
    body('qtdEstoque').notEmpty().withMessage('Campo Qtd em Estoque é obrigatório'),
    body('qtdEstoque').isNumeric().withMessage('Campo Qtd em Estoque ser numérico'),
    body('precoVenda').notEmpty().withMessage('Campo Preco de Venda é obrigatório'),
    body('precoVenda').isNumeric().withMessage('Campo Preco de Venda deve ser numérico'),
    body('precoCompra').notEmpty().withMessage('Campo Preco de Compra é obrigatório'),
    body('precoCompra').isNumeric().withMessage('Campo Preco de Compra deve ser numérico'),
    body('idCategoria').notEmpty().withMessage('Campo Categoria é obrigatório'),
    body('idCategoria').isNumeric().withMessage('Campo Categoria deve ser numérico'),
  ], ProdutosController.adicionar)
  .get('/produtos/', autenticacao, permissao(['admin', 'leitura', 'manipulacao']), ProdutosController.exibirTodos)
  .get('/produtos/:id', autenticacao, permissao(['admin', 'leitura', 'manipulacao']), ProdutosController.exibirUm)
  .put('/produtos/:id', autenticacao, permissao(['admin', 'manipulacao']), [
    body('nome').notEmpty().withMessage('Campo nome é obrigatório'),
    body('descricao').notEmpty().withMessage('Campo Descricao é obrigatório'),
    body('qtdEstoque').notEmpty().withMessage('Campo Qtd em Estoque é obrigatório'),
    body('qtdEstoque').isNumeric().withMessage('Campo Qtd em Estoque ser numérico'),
    body('precoVenda').notEmpty().withMessage('Campo Preco de Venda é obrigatório'),
    body('precoVenda').isNumeric().withMessage('Campo Preco de Venda deve ser numérico'),
    body('precoCompra').notEmpty().withMessage('Campo Preco de Compra é obrigatório'),
    body('precoCompra').isNumeric().withMessage('Campo Preco de Compra deve ser numérico'),
    body('idCategoria').notEmpty().withMessage('Campo Categoria é obrigatório'),
    body('idCategoria').isNumeric().withMessage('Campo Categoria deve ser numérico'),
  ], ProdutosController.atualizar)
  .delete('/produtos/:id', autenticacao, permissao(['admin']), ProdutosController.deletar);

export default produtosRouter;
