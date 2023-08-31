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
    host: "127.0.0.1",
    user: "jules",
    port: 5432,
    password: "",
    database: "smart-brain"
  }
});

app.use(cors());

app.get('/', (req, res) => { res.send("success"); });

app.post('/signin', handleSignIn(db, bcrypt));

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { getProfile(req, res, db) });

app.put('/image', (req, res) => { handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { handleApiCall(req, res) });

app.listen(3000, () => {
  console.log("app is running on port 3000");
});