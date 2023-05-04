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

const createMosquee = (req, res) => {
  const { nom_mosque, adresse, longitude, latitude, id_ville } = req.body;
  console.log(nom_mosque);
  const sql = 'INSERT INTO mosques (nom_mosque, adresse, longitude, latitude, id_ville) VALUES (?, ?, ?, ?, ?)';
  const values = [nom_mosque, adresse, longitude, latitude, id_ville];

  sequelize.query(sql, { replacements: values, type: QueryTypes.INSERT })
    .then((result) => {
      console.log(`Inserted mosquee times for ${nom_mosque} successfully:`, result);
      res.status(201).json({ message: 'Mosquee created successfully' });
    })
    .catch((error) => {
      console.error(`Error inserting mosquee times for ${nom_mosque}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    });
};


module.exports = {
  getAllMosquee,
  createMosquee
};
