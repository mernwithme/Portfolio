const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const USER = "portx";
const PASS = "nithish06";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER && password === PASS) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
