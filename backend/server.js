require('dotenv').config();
const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


connection.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL");
});

// API route
app.post("/api/contact", (req, res) => {
  const { name, mobile, email, topic, message } = req.body;
  const sql = "INSERT INTO contact_messages (name, mobile, email, topic, message) VALUES (?, ?, ?, ?, ?)";
  
  // ✅ Use connection instead of db
  connection.query(sql, [name, mobile, email, topic, message], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).send("Server error");
    }
    res.send("✅ Message submitted successfully!");
  });
});

// Start server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
