const { QueryTypes } = require('sequelize');
const sequelize = require('../db');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await sequelize.query(
      `
      SELECT * FROM users
      WHERE email = ? and password = ?
      `,
      {
        replacements: [email, password],
        type: QueryTypes.SELECT
      }
    );
    res.json(user);
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    res.status(500).json({ error: 'Error fetching prayer times' });
  }
};

module.exports = {
    login
};


