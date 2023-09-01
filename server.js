import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signin.js";
import getProfile from "./controllers/profile.js";
import { handleImage, handleApiCall } from "./controllers/image.js";

const app = express();
app.use(express.json());

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    ssl: true,
  }
});

app.use(cors());

app.get('/', (req, res) => { res.send("success"); });

app.post('/signin', handleSignIn(db, bcrypt));

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { getProfile(req, res, db) });

app.put('/image', (req, res) => { handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { handleApiCall(req, res) });

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});