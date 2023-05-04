const sequelize = require('../db');
const { QueryTypes } = require('sequelize');

const getAllHolidays = async (req, res) => {
  try {
    const event = await sequelize.query(
      'SELECT * FROM holidays',
      { type: QueryTypes.SELECT }
    );
    res.json(event);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    res.status(500).json({ error: 'Error fetching holidays' });
  }
};

const createHoliday = (req, res) => {
  const { start_date, nom_holiday, description } = req.body;
  const sql = 'INSERT INTO holidays (start_date, nom_holiday, description) VALUES (?, ?, ?)';
  const values = [start_date, nom_holiday, description];

  sequelize.query(sql, { replacements: values, type: QueryTypes.INSERT })
    .then((result) => {
      console.log(`Inserted holiday times for ${nom_holiday} successfully:`, result);
      res.status(201).json({ message: 'holiday created successfully' });
    })
    .catch((error) => {
      console.error(`Error inserting holiday times for ${nom_holiday}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

module.exports = {
  getAllHolidays,
  createHoliday
};
