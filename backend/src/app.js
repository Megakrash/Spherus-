const express = require("express");
const path = require("path");
const cors = require("cors");

const getRoutes = require("./routes/getRoutes");
const postRoutes = require("./routes/postRoutes");
const patchRoutes = require("./routes/patchRoutes");
const deleteRoutes = require("./routes/deleteRoutes");
// const { verifyToken } = require("./handlers/auth");
// const getRoutesFunctions = require("./handlers/getRoutesFunctions");
// const postRoutesFunctions = require("./handlers/postRoutesFunctions");

const app = express();

// use some application-level middlewares
app.use(
  cors()
  //   {
  //   origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  //   optionsSuccessStatus: 200,
  // }
);

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
// app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes

app.use(getRoutes);
app.use(postRoutes);
app.use(patchRoutes);
app.use(deleteRoutes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Redirect all requests to the REACT app
// const reactIndexFile = path.join(
//   __dirname,
//   "..",
//   "..",
//   "frontend",
//   "dist",
//   "index.html"
// );

// if (fs.existsSync(reactIndexFile)) {
//   app.get("*", (req, res) => {
//     res.sendFile(reactIndexFile);
//   });
// }

// ready to export
module.exports = app;
