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

Clientes.hasMany(Pedidos, {
  foreignKey: 'id_cliente',
});
Pedidos.belongsTo(Clientes, {
  foreignKey: 'id_cliente',
});
StatusPedidos.hasMany(Pedidos, {
  foreignKey: 'id_status',
});
Pedidos.belongsTo(StatusPedidos, {
  foreignKey: 'id_status',
});

// Pedidos.sync({ force: true });

export default Pedidos;
