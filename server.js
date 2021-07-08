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
      "create table songs(songName varchar(20), songId integer, genre varchar(20), artistName varchar(30), views integer, likes integer, coverImageURL varchar(100), audioURL varchar(100), subscription varchar(20), primary key(songId));"
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
  let resp = {
    status: "Got login credentials",
    valid: false,
    userType: "user",
  };

  db.all(
    `select username, password, usertype from users where username= '${request.body.username}'`,
    (err, rows) => {
      if (rows.length == 1 && rows[0].password == request.body.password) {
        resp.valid = true;
        resp.userType = rows[0].usertype;
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
  res.sendFile("profile.html", { root: __dirname });
});

// handling redirect to artist songs page
app.get("/manage", (req, res) => {
  res.sendFile("songs.html", { root: __dirname });
});

// handling user info requests
app.post("/user", (req, res) => {
  db.all(
    `select email, mobile, subscription, usertype from users where username= '${req.body.username}'`,
    (err, rows) => {
      res.send({ userData: rows[0] });
    }
  );
});

// updating user information
app.post("/updateUser", (req, res) => {
  const updateQuery =
    "UPDATE USERS SET EMAIL='" +
    req.body.email +
    "', MOBILE='" +
    req.body.mobile +
    "', SUBSCRIPTION='" +
    req.body.subscription +
    "' WHERE USERNAME='" +
    req.body.username +
    "';";
  db.run(updateQuery, (result, err) => {
    if (err) {
      res.send({ status: "unsuccessful" });
    } else {
      res.send({ status: "successful" });
    }
  });
});

// handling song info requests
app.post("/song", (req, res) => {
  db.all(
    `select * from songs where artistName='${req.body.username}'`,
    (err, rows) => {
      res.send({ songData: rows });
    }
  );
});

// handling song info requests
app.post("/songs", (req, res) => {
  db.all(`select * from songs`, (err, rows) => {
    res.send({ songData: rows });
  });
});

// adding songs to the database
app.post("/songAdd", (request, response) => {
  let songId;
  db.all("SELECT * FROM SONGS", (err, rows) => {
    songId = rows.length;
    const insertQuery =
      "INSERT INTO SONGS VALUES('" +
      request.body.songName +
      "', " +
      songId +
      ", '" +
      request.body.genre +
      "', '" +
      request.body.artistName +
      "', 0, 0, '" +
      request.body.coverImgURL +
      "', '" +
      request.body.audioURL +
      "', '" +
      request.body.subscription +
      "')";
    db.run(insertQuery);
  });
  response.send({ status: "success" });
});

// handling history requests

// handling playlist requests

// closing the database
// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log("Closed the database connection.");
// });
