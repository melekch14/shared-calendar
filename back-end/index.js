const express = require('express');
const prayerTimesRouter = require('./routes/prayerTimes');
const villeRouter = require('./routes/villeRouter');
const eventsRouter = require('./routes/eventsRouter');
const mosqueeRouter = require('./routes/mosqueeRouter');
const holidayRouter = require('./routes/holidayRouter');
const cors = require('cors');
const updatePrayerTimes = require('./updatePrayerTimes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

updatePrayerTimes()
  .then(() => {
    console.log('Prayer times updated successfully. Starting server...');

    app.use('/prayer-times', prayerTimesRouter);
    app.use('/villes', villeRouter);
    app.use('/events', eventsRouter);
    app.use('/mosquee', mosqueeRouter);
    app.use('/holidays', holidayRouter);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });
