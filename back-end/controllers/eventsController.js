const sequelize = require('../db');
const { QueryTypes } = require('sequelize');

const getAllEvents = async (req, res) => {
  try {
    const event = await sequelize.query(
      'SELECT * FROM events',
      { type: QueryTypes.SELECT }
    );
    res.json(event);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching events' });
  }
};

const createEvent = (req, res) => {
  const { start_date, end_date, nom_events, description, id_ville } = req.body;
  const sql = 'INSERT INTO events (start_date, end_date, nom_events, description, id_ville) VALUES (?, ?, ?, ?, ?)';
  const values = [start_date, end_date, nom_events, description, id_ville];

  sequelize.query(sql, { replacements: values, type: QueryTypes.INSERT })
    .then((result) => {
      console.log(`Inserted events times for ${nom_events} successfully:`, result);
      res.status(201).json({ message: 'events created successfully' });
    })
    .catch((error) => {
      console.error(`Error inserting events times for ${nom_events}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

module.exports = {
    getAllEvents,
    createEvent
};
