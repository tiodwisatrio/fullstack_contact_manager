// make server with express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const port = 5000;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "contact_crud",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// * route get all data start

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM contact_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// * route get all data end

// * route post/insert start

app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert =
    "INSERT INTO contact_db (name, email, contact) VALUES (?,?,?)";
  db.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

// * route post/insert start

// * route delete by id start

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
  db.query(sqlRemove, id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// * route delete by id end

// * route update by id start

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlUpdate =
    "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
  db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// * route update by id end

app.listen(5000, () => {
  console.log(`Server listening at http://localhost:5000`);
});
