import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';
import Clientes from './Clientes.js';
import StatusPedidos from './StatusPedidos.js';

const Pedidos = sequelize.define('pedidos_vendas', {
  data_pedido: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

Pedidos.hasMany(Clientes, {
  foreignKey: 'id_cliente',
});
Clientes.belongsTo(Pedidos, {
  foreignKey: 'id_cliente',
});
Pedidos.hasMany(StatusPedidos, {
  foreignKey: 'id_status',
});
StatusPedidos.belongsTo(Pedidos, {
  foreignKey: 'id_status',
});

export default Pedidos;
