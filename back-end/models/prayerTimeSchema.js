const { DataTypes } = require('sequelize');

const prayerTimeSchema = {
  id_prayer_time: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dateFor: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fajr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dhuhr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maghrib: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_ville: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

module.exports = prayerTimeSchema;
