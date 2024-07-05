import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';

const StatusPedidos = sequelize.define('status_pedidos', {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default StatusPedidos;
