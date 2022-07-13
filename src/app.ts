import express from 'express';
import mysql from 'mysql2';

require('dotenv').config();

const router = require("./routes");

const app = express();
app.use(express.json());
app.use(router);

const port = 3000;

app.get('/', (req, res) => {
  
  res.send("Hello World!");

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

