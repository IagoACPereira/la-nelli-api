import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';

const CargosFuncionarios = sequelize.define('cargos_funcionarios', {
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

export default CargosFuncionarios;
