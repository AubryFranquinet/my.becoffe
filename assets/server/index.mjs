// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

// ------------ DATABASE CONFIG ------------
import pg from "pg";
const { Client } = pg;

const infoDB = {
  connectionString: process.env.URI,
  ssl: {
    rejectUnauthorized: false,
  },
};

// ------------ FUNCTIONS ------------
// GET ALL RECETTES FROM "recette"
export async function getRecettes() {
  const client = new Client(infoDB);
  await client.connect();
  const q = await client.query('SELECT * FROM "Recette";');
  client.end();
  return q.rows;
}

// ADD RECETTE TO TABLE "recette"
export async function addRecette(topicName, recetteDate, learnerName) {
  const client = new Client(infoDB);
  await client.connect();
  const victorlebg = await client.query(
    `INSERT INTO "Recette" (topic, date, learner) VALUES ($1, $2, $3);`,
    [topicName, recetteDate, learnerName]
  );
  return victorlebg;

  // (err, res) => {
  //   if (err) throw err;
  //   for (let row of res.rows) {
  //     console.log(JSON.stringify(row));
  //   }
  //   client.end();
  // }
}

// const client = await pool.connect();
// const recette = await client.query(
//   `INSERT INTO recette (learner, topic, date)
//    VALUES ($1, $2, $3);`,
//   [learnerName, topicName, recetteDate]
// );
// client.release();
// console.log(recette);
