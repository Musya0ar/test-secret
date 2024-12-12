const express = require("express");
const fishRoutes = require('./routes/fishRoutes');
const recipesRoutes = require('./routes/recipesRoutes');
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to fish2eat API!!");
});

app.use('/api/fish', fishRoutes);
app.use('/api/recipes', recipesRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
