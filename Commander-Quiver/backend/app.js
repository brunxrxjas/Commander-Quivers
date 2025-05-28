const express = require("express");
const cors = require('cors');
const path = require('path'); // Node.js path module

// --- Initialize Express App ---
const app = express();

// --- Core Middleware ---

// Enable Cross-Origin Resource Sharing (CORS)

app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
// Import your route handlers
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes"); // Keep if you plan to use it

// Mount the routers to specific base paths
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
 
  // In development, you might just have a simple root route
  app.get('/', (req, res) => {
    res.send('Commander\'s Quiver API is running in development mode...');
  });
module.exports = app;