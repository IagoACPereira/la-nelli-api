import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';
import Funcionarios from './Funcionarios.js';
import Produtos from './Produtos.js';
import Fornecedores from './Fornecedores.js';

const RegistroCompraFornecedor = sequelize.define('registro_compra_fornecedor', {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  custo: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

RegistroCompraFornecedor.hasMany(Funcionarios, {
  foreignKey: 'id_funcionario',
});
Funcionarios.belongsTo(RegistroCompraFornecedor, {
  foreignKey: 'id_funcionario',
});
RegistroCompraFornecedor.hasMany(Produtos, {
  foreignKey: 'id_produto',
});
Produtos.belongsTo(RegistroCompraFornecedor, {
  foreignKey: 'id_produto',
});
RegistroCompraFornecedor.hasMany(Fornecedores, {
  foreignKey: 'id_fornecedor',
});
Fornecedores.belongsTo(RegistroCompraFornecedor, {
  foreignKey: 'id_fornecedor',
});

export default RegistroCompraFornecedor;
