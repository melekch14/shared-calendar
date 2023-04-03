const https = require('https');
const { QueryTypes } = require('sequelize');
const express = require('express');
const sequelize = require('./db');
const prayerTimesRouter = require('./routes/prayerTimes');
const villeRouter = require('./routes/villeRouter');
const cors = require('cors');
// Create a new Express application
const app = express();

// Define the port number to listen on
const PORT = process.env.PORT || 3000;



function updatePrayerTimes() {
    return new Promise((resolve, reject) => {
        // Fetch all cities from the Ville table using an SQL query
        sequelize.query('SELECT * FROM ville', { type: QueryTypes.SELECT })
            .then((villes) => {
                const promises = [];

                // Iterate over each city and fetch its prayer times
                villes.forEach((ville) => {
                    // Remove spaces from the city name if they exist
                    const villeName = ville.nom_ville.replace(/\s/g, '');

                    // Make an API call to fetch the prayer times for the current city
                    const url = `https://muslimsalat.com/${villeName}/daily.json?key=7812b2a518b11265577db776e4a17b38`;
                    const promise = new Promise((resolve, reject) => {
                        https.get(url, (res) => {
                            let data = '';

                            // Collect the data from the response
                            res.on('data', (chunk) => {
                                data += chunk;
                            });

                            // Insert the data into the MySQL table when the response is complete
                            res.on('end', () => {
                                // Parse the data into a JavaScript object
                                const parsedData = JSON.parse(data);

                                // Create an object that matches the schema for the table
                                const prayerTime = {
                                    dateFor: parsedData.items[0].date_for,
                                    fajr: parsedData.items[0].fajr,
                                    dhuhr: parsedData.items[0].dhuhr,
                                    asr: parsedData.items[0].asr,
                                    maghrib: parsedData.items[0].maghrib,
                                    isha: parsedData.items[0].isha,
                                    id_ville: ville.id_ville,
                                };

                                // Check if there's already a prayer time in the database with the same date
                                const sql = `
                    SELECT * FROM prayer_times
                    WHERE last_date = ? AND id_ville = ?
                  `;
                                const values = [
                                    prayerTime.dateFor,
                                    prayerTime.id_ville,
                                ];

                                sequelize.query(sql, { replacements: values, type: QueryTypes.SELECT })
                                    .then((result) => {
                                        if (result.length > 0) {
                                            console.log(`Prayer times for ${ville.nom_ville} already exist for date ${prayerTime.dateFor}. Skipping...`);
                                            resolve();
                                        } else {
                                            // Insert the data into the MySQL table using an SQL query
                                            const sql = `
                          INSERT INTO prayer_times (last_date, fajr, dhuhr, asr, maghrib, isha, id_ville)
                          VALUES (?, ?, ?, ?, ?, ?, ?)
                        `;
                                            const values = [
                                                prayerTime.dateFor,
                                                prayerTime.fajr,
                                                prayerTime.dhuhr,
                                                prayerTime.asr,
                                                prayerTime.maghrib,
                                                prayerTime.isha,
                                                prayerTime.id_ville,
                                            ];

                                            sequelize.query(sql, { replacements: values, type: QueryTypes.INSERT })
                                                .then((result) => {
                                                    console.log(`Inserted prayer times for ${ville.nom_ville} successfully:`, result);
                                                    resolve(result);
                                                })
                                                .catch((error) => {
                                                    console.error(`Error inserting prayer times for ${ville.nom_ville}:`, error);
                                                    reject(error);
                                                });
                                        }
                                    })

                                    .catch((error) => {
                                        console.error(`Error querying prayer times for ${ville.nom_ville}:`, error);
                                        reject(error);
                                    });
                            });
                        }).on('error', (err) => {
                            console.error(`Error fetching prayer times for ${ville.nom_ville}:`, err.message);
                            reject(err);
                        });
                    });

                    promises.push(promise);
                });

                // Wait for all promises to resolve or reject before resolving the outer promise
                Promise.all(promises)
                    .then(() => {
                        console.log('All queries completed successfully.');
                        resolve();
                    })
                    .catch((error) => {
                        console.error('Error executing queries:', error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
                reject(error);
            });
    });
}



// Start the server after the prayer times have been updated
updatePrayerTimes()
    .then(() => {
        console.log('Prayer times updated successfully. Starting server...');
        
        // Define a route to fetch all prayer times
        app.use('/prayer-times', prayerTimesRouter);

        app.use('/ville', villeRouter);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error updating prayer times:', error);
    });  