import { Router } from 'express';
import { body } from 'express-validator';
import RegistroCompraFornecedorController from '../controllers/RegistroCompraFornecedorController.js';

const registroCompraFornecedorRouter = Router();

registroCompraFornecedorRouter
  .post('/registro-compra-fornecedor/', [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('custo').notEmpty().withMessage('Campo Custo é obrigatório'),
    body('idFuncionario').notEmpty().withMessage('Campo Funcionario é obrigatório'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idFornecedor').notEmpty().withMessage('Campo Fornecedor é obrigatório'),
  ], RegistroCompraFornecedorController.adicionar)
  .get('/registro-compra-fornecedor/', RegistroCompraFornecedorController.exibirTodos)
  .get('/registro-compra-fornecedor/:id', RegistroCompraFornecedorController.exibirUm)
  .put('/registro-compra-fornecedor/:id', [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('custo').notEmpty().withMessage('Campo Custo é obrigatório'),
    body('idFuncionario').notEmpty().withMessage('Campo Funcionario é obrigatório'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idFornecedor').notEmpty().withMessage('Campo Fornecedor é obrigatório'),
  ], RegistroCompraFornecedorController.atualizar)
  .delete('/registro-compra-fornecedor/:id', RegistroCompraFornecedorController.deletar);

export default registroCompraFornecedorRouter;
