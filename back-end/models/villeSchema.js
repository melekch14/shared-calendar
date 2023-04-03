const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const villeSchema = sequelize.define('Ville', {
  id_ville: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_ville: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = villeSchema;
