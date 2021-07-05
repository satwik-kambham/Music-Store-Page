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
  let resp = { status: "Got register credentials", valid: false };
  db.serialize(function () {
    let validUser = false;
    db.all(
      `select username from users where username= '${request.body.username}'`,
      (err, rows) => {
        if (rows.length == 0) {
          validUser = true;
        }
        resp.valid = validUser;
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
        if (validUser) {
          db.run(insertQuery);
        }
      }
    );
  });
});

// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log("Closed the database connection.");
// });
