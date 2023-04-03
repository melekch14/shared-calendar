const sequelize = require('../db');
const { QueryTypes } = require('sequelize');

const getAllVille = async (req, res) => {
  try {
    const ville = await sequelize.query(
      'SELECT * FROM ville',
      { type: QueryTypes.SELECT }
    );
    res.json(ville);
  } catch (error) {
    console.error('Error fetching ville:', error);
    res.status(500).json({ error: 'Error fetching ville' });
  }
};

module.exports = {
  getAllVille,
};
