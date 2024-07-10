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

function router(app) {
  app
    .use(
      express.json(),
      express.urlencoded({
        extended: true,
      }),
    )
    .get('/', (_, res) => {
      res.json('La Nelli API');
    })
    .use(
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
    );
}

export default router;
