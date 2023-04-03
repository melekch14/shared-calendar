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

module.exports = {
    getAllEvents,
};
