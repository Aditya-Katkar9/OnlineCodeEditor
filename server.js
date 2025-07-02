const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "./")));

app.post("/run", async (req, res) => {
  const payload = {
    clientId: "b15af8316fd870af434e758b85afed22",
    clientSecret: "8047986c399809afb397ff75a0776d2d78e0cad94147d82625fee63b9751631",
    ...req.body,
  };

  try {
    const result = await axios.post("https://api.jdoodle.com/v1/execute", payload);
    res.send(result.data);
  } catch (error) {
    console.error("JDoodle API Error:", error.message);
    res.status(500).send({ error: "Execution failed" });
  }
});

// Serve index or c.html by default
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "c.html"));
});

app.listen(5000, () => console.log("✅ Server running at http://localhost:5000"));
