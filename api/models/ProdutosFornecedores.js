import sequelize from '../config/conexaoDb.js';
import Fornecedores from './Fornecedores.js';
import Produtos from './Produtos.js';

const ProdutosFornecedores = sequelize.define('itens_pedidos', {}, {
  timestamps: false,
  freezeTableName: true,
});

ProdutosFornecedores.hasMany(Fornecedores, {
  foreignKey: 'id_fornecedor',
});
Fornecedores.belongsTo(ProdutosFornecedores, {
  foreignKey: 'id_fornecedor',
});
ProdutosFornecedores.hasMany(Produtos, {
  foreignKey: 'id_produto',
});
Produtos.belongsTo(ProdutosFornecedores, {
  foreignKey: 'id_produto',
});

export default ProdutosFornecedores;
