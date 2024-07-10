import { Router } from 'express';
import RegistroCompraFornecedorController from '../controllers/RegistroCompraFornecedorController.js';

const registroCompraFornecedorRouter = Router();

registroCompraFornecedorRouter
  .post('/registro-compra-fornecedor/', RegistroCompraFornecedorController.adicionar)
  .get('/registro-compra-fornecedor/', RegistroCompraFornecedorController.exibirTodos)
  .get('/registro-compra-fornecedor/:id', RegistroCompraFornecedorController.exibirUm)
  .put('/registro-compra-fornecedor/:id', RegistroCompraFornecedorController.atualizar)
  .delete('/registro-compra-fornecedor/:id', RegistroCompraFornecedorController.deletar);

export default registroCompraFornecedorRouter;
