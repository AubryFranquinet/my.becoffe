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

}
// GET ALL USERS FROM "User"
export async function getUsers() {
    const client = new Client(infoDB);
    await client.connect();
    const q = await client.query('SELECT * FROM "User";');
    client.end();
    return q.rows;
}


// INSERT USER INTO "users"
export async function addUser(first_name, last_name, email, password, account_type, discord) {
    const client = new Client(infoDB);
    await client.connect();
    const insertUser = await client.query(
        `INSERT INTO "User" (first_name, last_name, email, password, account_type, discord) VALUES ($1, $2, $3, $4, $5, $6);`,
        [first_name, last_name, email, password, account_type, discord]
    );
    return insertUser;

}
