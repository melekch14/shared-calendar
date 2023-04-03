const sequelize = require('./db');
const { QueryTypes } = require('sequelize');
const https = require('https');

async function updatePrayerTimes() {
    try {
        const villes = await sequelize.query('SELECT * FROM ville', { type: QueryTypes.SELECT });
        const promises = [];

        for (const ville of villes) {
            const villeName = ville.nom_ville.replace(/\s/g, '');
            const url = `https://muslimsalat.com/${villeName}/daily.json?key=7812b2a518b11265577db776e4a17b38`;
            promises.push(
                new Promise(async (resolve, reject) => {
                    https.get(url, (res) => {
                        let data = '';

                        res.on('data', (chunk) => {
                            data += chunk;
                        });

                        res.on('end', async () => {
                            const parsedData = JSON.parse(data);
                            const prayerTime = {
                                dateFor: parsedData.items[0].date_for,
                                fajr: parsedData.items[0].fajr,
                                sunrise: parsedData.items[0].shurooq,
                                dhuhr: parsedData.items[0].dhuhr,
                                asr: parsedData.items[0].asr,
                                maghrib: parsedData.items[0].maghrib,
                                isha: parsedData.items[0].isha,
                                id_ville: ville.id_ville,
                            };

                            const existingData = await sequelize.query(
                                `
                SELECT * FROM prayer_times
                WHERE id_ville = ?
                `,
                                {
                                    replacements: [prayerTime.id_ville],
                                    type: QueryTypes.SELECT
                                }
                            );

                            if (existingData.length === 0) {
                                const [results] = await sequelize.query(
                                    `
                  INSERT INTO prayer_times (last_date, fajr, sunrise, dhuhr, asr, maghrib, isha, id_ville)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                  `,
                                    {
                                        replacements: [
                                            prayerTime.dateFor,
                                            prayerTime.fajr,
                                            prayerTime.sunrise,
                                            prayerTime.dhuhr,
                                            prayerTime.asr,
                                            prayerTime.maghrib,
                                            prayerTime.isha,
                                            prayerTime.id_ville
                                        ],
                                        type: QueryTypes.INSERT
                                    }
                                );
                                console.log(`Inserted prayer times for ${ville.nom_ville} successfully:`, results);
                                resolve(results);
                            } else {
                                const existingPrayerTime = existingData[0];
                                if (existingPrayerTime.last_date === prayerTime.dateFor) {
                                    console.log(`Prayer times for ${ville.nom_ville} already exist for date ${prayerTime.dateFor}. Skipping...`);
                                    resolve();
                                } else {
                                    const [results] = await sequelize.query(
                                        `
                    UPDATE prayer_times
                    SET last_date = ?, fajr = ?, sunrise = ?, dhuhr = ?, asr = ?, maghrib = ?, isha = ?
                    WHERE id_ville = ?
                    `,
                                        {
                                            replacements: [
                                                prayerTime.dateFor,
                                                prayerTime.fajr,
                                                prayerTime.sunrise,
                                                prayerTime.dhuhr,
                                                prayerTime.asr,
                                                prayerTime.maghrib,
                                                prayerTime.isha,
                                                prayerTime.id_ville
                                            ],
                                            type: QueryTypes.UPDATE
                                        }
                                    );
                                    console.log(`Updated prayer times for ${ville.nom_ville} successfully:`, results);
                                    resolve(results);
                                }
                            }
                        });
                    }).on('error', (err) => {
                        console.error(`Error fetching prayer times for ${ville.nom_ville}:`, err.message);
                        reject(err);
                    });
                })
            );
        }

        await Promise.all(promises);
        console.log('All queries completed successfully.');
    } catch (error) {
        console.error('Error updating prayer times:', error);
        throw error;
    }
}

module.exports = updatePrayerTimes;

