const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

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
server.listen(PORT, () => {
    console.log("START SERVER");
});

const pg = require("pg");

const { Pool } = pg;
const pool = new Pool({
    user: "postgres",
    host: "db",
    database: "keys",
    password: "example",
    port: 5432
});

const query = (sql, values, convertResult = result => result) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (errors, results) => {
            if (errors) {
                reject(errors);
            } else {
                resolve(convertResult(results));
            }
        });
    });
};

module.exports = {
    query,
    get: (url, handler) => {
        app.get("/api" + url, handler);
    },
    post: (url, handler) => {
        app.post("/api" + url, handler);
    },
    put: (url, handler) => {
        app.put("/api" + url, handler);
    },
    del: (url, handler) => {
        app.delete("/api" + url, handler);
    }
};
