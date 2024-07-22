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

Pedidos.hasMany(ItensPedidos, {
  foreignKey: 'id_pedido',
});
ItensPedidos.belongsTo(Pedidos, {
  foreignKey: 'id_pedido',
});
Produtos.hasMany(ItensPedidos, {
  foreignKey: 'id_produto',
});
ItensPedidos.belongsTo(Produtos, {
  foreignKey: 'id_produto',
});

export default ItensPedidos;
