import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { getRecettes, addRecette } from "./functionsRecette.mjs";

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

// GET ALL RECETTES FROM "recette"
app.get("/get-all-recettes", async (req, res, next) => {
  const test = await getRecettes();
  return res.send(test);
});

// ADD RECETTE TO TABLE "recette"
app.post("/add-recette", async (req, res, next) => {
  const { topicName, recetteDate, learnerName } = req.body;
  if (topicName !== "" && learnerName !== "") {
    const recette = await addRecette(topicName, recetteDate, learnerName);
    return res.send(recette);
  } else
    return console.log("data not added to database: html input error, user fault :)");
});

// ------------ LISTENER ------------
app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}/`)
);
