const { QueryTypes } = require('sequelize');
const sequelize = require('../db');

const getAllPrayerTimes = (req, res) => {
  const sql = `
    SELECT pt.last_date, pt.fajr, pt.dhuhr, pt.asr, pt.maghrib, pt.isha, v.nom_ville
    FROM prayer_times pt
    JOIN ville v ON pt.id_ville = v.id_ville
  `;

  sequelize.query(sql, { type: QueryTypes.SELECT })
    .then((prayerTimes) => {
      res.json(prayerTimes);
    })
    .catch((error) => {
      console.error('Error fetching prayer times:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

const getPrayerTimeByIdVille = async (req, res) => {
  try {
    const { id_ville } = req.params;
    const [prayerTime] = await sequelize.query(
      `
      SELECT * FROM prayer_times
      WHERE id_ville = ?
      `,
      {
        replacements: [id_ville],
        type: QueryTypes.SELECT
      }
    );
    res.json(prayerTime);
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    res.status(500).json({ error: 'Error fetching prayer times' });
  }
};

module.exports = {
  getAllPrayerTimes,
  getPrayerTimeByIdVille,
};


