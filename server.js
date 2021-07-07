// adding express
const express = require("express");
const app = express();

// adding sqlite
const sqlite3 = require("sqlite3").verbose();

// setting up express
app.listen(3000, () => console.log("listening at localhost:3000"));
app.use(express.static("."));
app.use(express.json());

// connecting to database
let db = new sqlite3.Database("./Database/data.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

// checking if tables exist
db.run("SELECT * FROM USERS", (err, result) => {
  if (err) {
    //executing commands to create tables
    console.log("Tables are not present, creating tables");
    db.run(
      "create table users(username varchar(30), password varchar(30), email varchar(30), mobile varchar(13), subscription varchar(20), usertype varchar(6), primary key(username));"
    );
    db.run(
      "create table songs(songName varchar(20), songId integer, duration varchar(10), genre varchar(20), artistName varchar(30), views integer, likes integer, coverImageURL varchar(100), audioURL varchar(100), subscription varchar(20), primary key(songId));"
    );
    db.run(
      "create table history(username varchar(20), songId varchar(20), timestamp varchar(20));"
    );
    db.run(
      "create table likedSongs(username varchar(30), songId varchar(20));"
    );
    db.run(
      "create table playlists(playlistName varchar(30), songId varchar(20));"
    );
  } else {
    console.log("Tables exist");
  }
});

// login handling
app.post("/login", (request, response) => {
  let resp = { status: "Got login credentials", valid: false };

  db.all(
    `select username, password from users where username= '${request.body.username}'`,
    (err, rows) => {
      if (rows.length == 1 && rows[0].password == request.body.password) {
        resp.valid = true;
      }
      response.send(resp);
    }
  );
});

// registration handling
app.post("/register", (request, response) => {
  let resp = { status: "Got register credentials", valid: false };
  db.all(
    `select username from users where username= '${request.body.username}'`,
    (err, rows) => {
      if (rows.length == 0) {
        resp.valid = true;
      }
      response.send(resp);
      const insertQuery =
        "INSERT INTO USERS VALUES('" +
        request.body.username +
        "', '" +
        request.body.password +
        "', '" +
        request.body.email +
        "', '" +
        request.body.mobile +
        "', 'base' , '" +
        request.body.userType +
        "')";
      if (resp.valid) {
        db.run(insertQuery);
      }
    }
  );
});

// handling redirect to main page
app.get("/main", (req, res) => {
  let username = req.query.user;
  res.sendFile("main.html", { root: __dirname });
});

// handling redirect to profile page
app.get("/profile", (req, res) => {
  let username = req.query.user;
  res.sendFile("profile.html", { root: __dirname });
});

// handling user info requests
app.post("/user", (req, res) => {
  db.all(
    `select email, mobile, subscription from users where username= '${req.body.username}'`,
    (err, rows) => {
      res.send({ userData: rows[0] });
    }
  );
});

// handling song info requests

// handling history requests

// handling playlist requests

// closing the database
// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log("Closed the database connection.");
// });
