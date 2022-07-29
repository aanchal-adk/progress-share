import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

require('dotenv').config();
const router = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.use(function(req, res, next) {
  res.locals.transporter = transporter;
  next();
});

app.use(router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
