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

// CargosFuncionarios.sync({ force: true });

export default CargosFuncionarios;
