import express from 'express';
import statusPedidos from './StatusPedidosRoutes.js';
import clientes from './ClientesRoutes.js';
import cargosFuncionarios from './CargosFuncionariosRoutes.js';
import categoriasProdutos from './CategoriasProdutosRoutes.js';
import fornecedores from './FornecedoresRoutes.js';
import produtos from './ProdutosRoutes.js';
import funcionarios from './FuncionariosRoutes.js';
import pedidos from './PedidosRoutes.js';
import itensPedidos from './ItensPedidosRoutes.js';
import produtosFornecedores from './ProdutosFornecedoresRoutes.js';
import registroCompraFornecedor from './RegistroCompraFornecedorRoutes.js';
import erro404 from '../middlewares/erro404.js';

function router(app) {
  app
    .use(
      express.json(),
      express.urlencoded({
        extended: true,
      }),
    )
    .get('/api/', (_, res) => {
      res.json('La Nelli API');
    })
    .use(
      '/api/',
      statusPedidos,
      clientes,
      cargosFuncionarios,
      categoriasProdutos,
      fornecedores,
      produtos,
      funcionarios,
      pedidos,
      itensPedidos,
      produtosFornecedores,
      registroCompraFornecedor,
      erro404,
    );
}

export default router;
