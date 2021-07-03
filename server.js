const { response } = require("express");
const express = require("express");
const app = express();

app.listen(3000, () => console.log("listening at localhost:3000"));
app.use(express.static("."));
app.use(express.json());

app.post("/login", (request, response) => {
  console.log(request.body);
  response.send('Got login credentials');
});

app.post("/register", (request, response) => {
    console.log(request.body);
    response.send('Got register credentials');
  });
