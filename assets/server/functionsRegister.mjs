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


// INSERT USER INTO "users"
export async function addUser(first_name, last_name, email, password, account_type,discord) {
    const client = new Client(infoDB);
    await client.connect();
    const insertUser = await client.query(
        `INSERT INTO "User" (first_name, last_name, email, password, account_type, discord) VALUES ($1, $2, $3, $4, $5, $6);`,
        [first_name, last_name, email, password, account_type, discord]
    );
    return insertUser;

}

