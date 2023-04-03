const { QueryTypes } = require('sequelize');
const sequelize = require('../db');

const getAllMosquee = (req, res) => {
    const sql = `
      SELECT m.nom_mosque, m .adresse, m.longitude, m.latitude, v.nom_ville
      FROM mosques m
      JOIN ville v ON m.id_ville = v.id_ville
    `;
  
    sequelize.query(sql, { type: QueryTypes.SELECT })
      .then((mosquee) => {
        res.json({ data: mosquee });
      })
      .catch((error) => {
        console.error('Error fetching mosquee times:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  };

  module.exports = {
    getAllMosquee,
  };
