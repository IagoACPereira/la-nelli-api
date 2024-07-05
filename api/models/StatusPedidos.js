import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';

const StatusPedidos = sequelize.define('status_pedidos', {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

export default StatusPedidos;
