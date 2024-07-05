import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';
import CargosFuncionarios from './CargosFuncionarios.js';

const Funcionarios = sequelize.define('funcionarios', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salario: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  data_contratacao: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

Funcionarios.hasMany(CargosFuncionarios, {
  foreignKey: 'id_cargo',
});
CargosFuncionarios.belongsTo(Funcionarios, {
  foreignKey: 'id_cargo',
});

export default Funcionarios;
