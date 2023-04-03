const express = require('express');
const prayerTimesRouter = require('./routes/prayerTimes');
const villeRouter = require('./routes/villeRouter');
const eventsRouter = require('./routes/eventsRouter');
const mosqueeRouter = require('./routes/mosqueeRouter');
const cors = require('cors');
const updatePrayerTimes = require('./updatePrayerTimes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

updatePrayerTimes()
  .then(() => {
    console.log('Prayer times updated successfully. Starting server...');

    app.use('/prayer-times', prayerTimesRouter);
    app.use('/villes', villeRouter);
    app.use('/events', eventsRouter);
    app.use('/mosquee', mosqueeRouter);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });
