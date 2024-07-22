import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';
import CargosFuncionarios from './CargosFuncionarios.js';
import Permissoes from './Permissoes.js';

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
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salario: {
    type: DataTypes.DOUBLE,
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

CargosFuncionarios.hasMany(Funcionarios, {
  foreignKey: 'id_cargo',
});
Funcionarios.belongsTo(CargosFuncionarios, {
  foreignKey: 'id_cargo',
});
Permissoes.hasMany(Funcionarios, {
  foreignKey: 'id_permissao',
});
Funcionarios.belongsTo(Permissoes, {
  foreignKey: 'id_permissao',
});

// Funcionarios.sync({ force: true });

export default Funcionarios;
