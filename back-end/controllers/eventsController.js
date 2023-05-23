const sequelize = require('../db');
const { QueryTypes } = require('sequelize');

const getAllEvents = async (req, res) => {
  try {
    const event = await sequelize.query(
      'SELECT e.*,v.nom_ville FROM events e join ville v on e.id_ville = v.id_ville',
      { type: QueryTypes.SELECT }
    );
    res.json(event);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching events' });
  }
};

const allEvents = async (req, res) => {
  try {
    const event = await sequelize.query(
      'SELECT e.*,v.nom_ville FROM events e join ville v on e.id_ville = v.id_ville',
      { type: QueryTypes.SELECT }
    );
    res.json({data:event});
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

const updateEvent = (req, res) => {
  const { start_date, end_date, nom_events, description, id_ville } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE events SET start_date = ?, end_date = ?, nom_events = ?, description = ?, id_ville = ? WHERE id_events = ?';
  const values = [start_date, end_date, nom_events, description, id_ville, id];

  sequelize.query(sql, { replacements: values, type: QueryTypes.UPDATE })
    .then((result) => {
      console.log(`Updated event with id ${id} successfully:`, result);
      res.status(200).json({ message: 'Event updated successfully' });
    })
    .catch((error) => {
      console.error(`Error updating event with id ${id}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

const deleteEvent = (req, res) => {
  const { id } = req.params;

  sequelize.query('DELETE FROM events WHERE id_events = ?', { replacements: [id], type: QueryTypes.DELETE })
    .then((result) => {
      console.log(`Deleted holiday with id ${id} successfully:`, result);
      res.status(200).send();
    })
    .catch((error) => {
      console.error(`Error deleting holiday with id ${id}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    });
};


module.exports = {
    getAllEvents,
    createEvent,
    allEvents,
    updateEvent,
    deleteEvent
};
