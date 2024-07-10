import { Router } from 'express';
import ClientesController from '../controllers/ClientesController.js';

const clientesRouter = Router();

clientesRouter
  .post('/clientes/', ClientesController.adicionar)
  .get('/clientes/', ClientesController.exibirTodos)
  .get('/clientes/:id', ClientesController.exibirUm)
  .put('/clientes/:id', ClientesController.atualizar)
  .delete('/clientes/:id', ClientesController.deletar);

export default clientesRouter;
