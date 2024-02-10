import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;

const connection = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6683212",
  password: "Ysh8z1qKNG",
  database: "sql6683212",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signup", (req, res) => {
  const { username, email, password, full_name, birthdate } = req.body;

  const sql =
    "INSERT INTO users (username, email, password, full_name, birthdate) VALUES (?, ?, ?, ?, ?)";
  const values = [username, email, password, full_name, birthdate];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error signing up:", err);
      res.status(500).json({ error: "Error signing up" });
      return;
    }
    console.log("User signed up successfully");
    res.status(200).json({ message: "User signed up successfully" });
  });
});

// Signin Route
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const values = [email, password];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error signing in:", err);
      res.status(500).json({ error: "Error signing in" });
      return;
    }
    if (result.length === 0) {
      console.log("User not found or invalid credentials");
      res.status(404).json({ error: "User not found or invalid credentials" });
    } else {
      console.log("User signed in successfully");
      res.status(200).json({ message: "User signed in successfully" });
    }
  });
});

app.get("/dashboard/:email", (req, res) => {
  const email = req.params.email;

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, email, (err, result) => {
    if (err) {
      console.error("Error fetching user details:", err);
      res.status(500).json({ error: "Error fetching user details" });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const user = result[0];
    res.status(200).json({ user });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
