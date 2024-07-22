import { Router } from 'express';
import { body } from 'express-validator';
import RegistroCompraFornecedorController from '../controllers/RegistroCompraFornecedorController.js';

const registroCompraFornecedorRouter = Router();

registroCompraFornecedorRouter
  .post('/registro-compra-fornecedor/', [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('custo').notEmpty().withMessage('Campo Custo é obrigatório'),
    body('custo').isNumeric().withMessage('Campo Custo deve ser numérico'),
    body('idFuncionario').notEmpty().withMessage('Campo Funcionario é obrigatório'),
    body('idFuncionario').isNumeric().withMessage('Campo Funcionario deve ser numérico'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idProduto').isNumeric().withMessage('Campo Produto deve ser numérico'),
    body('idFornecedor').notEmpty().withMessage('Campo Fornecedor é obrigatório'),
    body('idFornecedor').isNumeric().withMessage('Campo Fornecedor deve ser numérico'),
  ], RegistroCompraFornecedorController.adicionar)
  .get('/registro-compra-fornecedor/', RegistroCompraFornecedorController.exibirTodos)
  .get('/registro-compra-fornecedor/:id', RegistroCompraFornecedorController.exibirUm)
  .put('/registro-compra-fornecedor/:id', [
    body('quantidade').notEmpty().withMessage('Campo Quantidade é obrigatório'),
    body('custo').notEmpty().withMessage('Campo Custo é obrigatório'),
    body('custo').isNumeric().withMessage('Campo Custo deve ser numérico'),
    body('idFuncionario').notEmpty().withMessage('Campo Funcionario é obrigatório'),
    body('idFuncionario').isNumeric().withMessage('Campo Funcionario deve ser numérico'),
    body('idProduto').notEmpty().withMessage('Campo Produto é obrigatório'),
    body('idProduto').isNumeric().withMessage('Campo Produto deve ser numérico'),
    body('idFornecedor').notEmpty().withMessage('Campo Fornecedor é obrigatório'),
    body('idFornecedor').isNumeric().withMessage('Campo Fornecedor deve ser numérico'),
  ], RegistroCompraFornecedorController.atualizar)
  .delete('/registro-compra-fornecedor/:id', RegistroCompraFornecedorController.deletar);

export default registroCompraFornecedorRouter;
