import express from "express";
import bot from "./src/bot.js";
import bodyParser from "body-parser";
// Env
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(`/tagAllBot`, (req, _res) => {
  bot.processUpdate(req.body);

  // Only for API Testing. Do not use in production because it will cause no response from Telegram
  // res.sendStatus(200);
});

export default app;
