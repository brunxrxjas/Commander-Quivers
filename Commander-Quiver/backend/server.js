let dbConnect = require ("./config/db")
const express = require ("express")
const app = require("./app");
require("dotenv").config();


app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my Commander Quivers application."});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});