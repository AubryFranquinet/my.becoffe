import express from "express";
import cors from "cors";
import { } from "./index.mjs";

const PORT = 3000;
const app = express();

// These lines are for express configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This function will be called everytime we make a request to the server (It will log the requested url in the terminal)
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.listen(PORT, () =>
    console.log(`server started at http://localhost:${PORT}/`));

// If we go to the root of the server (localhost:3000/) with a browser
// we should get a warm welcome message
app.get("/", (req, res, next) => res.send({ info: "Welcome!" }));

