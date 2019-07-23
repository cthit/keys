/* External Requirements */
const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const pg = require("pg");

const PORT = 4000;

const app = express();
const server = http.createServer(app);

/* Start Server */
server.listen(PORT);

app.post("/api/key-type", (req, res) => {

});