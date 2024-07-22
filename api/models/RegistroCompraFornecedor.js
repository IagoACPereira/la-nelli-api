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
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

Funcionarios.hasMany(RegistroCompraFornecedor, {
  foreignKey: 'id_funcionario',
});
RegistroCompraFornecedor.belongsTo(Funcionarios, {
  foreignKey: 'id_funcionario',
});
Produtos.hasMany(RegistroCompraFornecedor, {
  foreignKey: 'id_produto',
});
RegistroCompraFornecedor.belongsTo(Produtos, {
  foreignKey: 'id_produto',
});
Fornecedores.hasMany(RegistroCompraFornecedor, {
  foreignKey: 'id_fornecedor',
});
RegistroCompraFornecedor.belongsTo(Fornecedores, {
  foreignKey: 'id_fornecedor',
});

// RegistroCompraFornecedor.sync({ force: true });

export default RegistroCompraFornecedor;
