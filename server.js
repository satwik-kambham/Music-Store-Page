const express = require("express");
const app = express();

const sqlite3 = require("sqlite3").verbose();

app.listen(3000, () => console.log("listening at localhost:3000"));
app.use(express.static("."));
app.use(express.json());

let db = new sqlite3.Database("./Database/data.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

app.post("/login", (request, response) => {
  console.log(request.body);
  response.send("Got login credentials");
});

app.post("/register", (request, response) => {
  console.log(request.body);
  response.send("Got register credentials");
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Closed the database connection.");
});
