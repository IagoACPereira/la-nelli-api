import sequelize from '../config/conexaoDb.js';
import Fornecedores from './Fornecedores.js';
import Produtos from './Produtos.js';

const ProdutosFornecedores = sequelize.define('produtos_fornecedores', {}, {
  timestamps: false,
  freezeTableName: true,
});

Fornecedores.hasMany(ProdutosFornecedores, {
  foreignKey: 'id_fornecedor',
});
ProdutosFornecedores.belongsTo(Fornecedores, {
  foreignKey: 'id_fornecedor',
});
Produtos.hasMany(ProdutosFornecedores, {
  foreignKey: 'id_produto',
});
ProdutosFornecedores.belongsTo(Produtos, {
  foreignKey: 'id_produto',
});

export default ProdutosFornecedores;
