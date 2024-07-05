import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';
import Pedidos from './Pedidos.js';
import Produtos from './Produtos.js';

const ItensPedidos = sequelize.define('itens_pedidos', {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

ItensPedidos.hasMany(Pedidos, {
  foreignKey: 'id_pedido',
});
Pedidos.belongsTo(ItensPedidos, {
  foreignKey: 'id_pedido',
});
ItensPedidos.hasMany(Produtos, {
  foreignKey: 'id_produto',
});
Produtos.belongsTo(ItensPedidos, {
  foreignKey: 'id_produto',
});

export default ItensPedidos;
