import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { addUser } from "./functionsRegister.mjs";

const PORT = process.env.PORT || 5000;
const app = express();

// ------------ CONFIGURATION ------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This function will be called everytime we make a request to the server (It will log the requested url in the terminal)
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

//------------ ROUTER ------------
// HOME
app.get("/", (req, res) => res.send("this is a test"));

// ADD USER
app.post("/register", async (req, res, next) => {
    const {first_name, last_name, email, password, account_type, discord} = req.body;
    if (first_name !== "" && last_name !== "" && email !== "" && password !== "" && account_type !== "" && discord !== "") {
        const user = await addUser(first_name, last_name, email, password, account_type, discord);
        return res.send(user);
    } else
        return console.log("data not added to database: html input error, user fault :)");
});

// ------------ LISTENER ------------
app.listen(PORT, () =>
    console.log(`server started at https://localhost:${PORT}/`)
);
