const express = require("express");
const path = require("path");
const cors = require("cors");

const getRoutes = require("./routes/getRoutes");
const postRoutes = require("./routes/postRoutes");
const patchRoutes = require("./routes/patchRoutes");
const deleteRoutes = require("./routes/deleteRoutes");

const app = express();

// use some application-level middlewares

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// API routes

app.use(getRoutes);
app.use(postRoutes);
app.use(patchRoutes);
app.use(deleteRoutes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
