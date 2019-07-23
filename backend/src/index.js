/* External Requirements */
const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const uuid = require("uuid/v4");

const {
    getKeyTypes,
    getKeyType,
    addKeyType,
    editKeyType,
    deleteKeyType
} = require("./key-type/key-type.db");

const PORT = 4000;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

/* Start Server */
server.listen(PORT);

app.get("/api/key_type", async (req, res) => {
    const keyTypes = await getKeyTypes();
    res.send(keyTypes);
});

app.get("/api/key_type/:id", async (req, res) => {
    const { id } = req.params;
    const keyType = await getKeyType(id);
    res.send(keyType);
});

app.post("/api/key_type", async (req, res) => {
    const { name } = req.body;
    await addKeyType(name);
    res.send(201);
});

/**
 * Update name
 */
app.put("/api/key_type/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    await editKeyType(id, name);
    res.send(201);
});

app.delete("/api/key_type/:id", async (req, res) => {
    const { id } = req.params;
    await deleteKeyType(id);
    res.send(200);
});
