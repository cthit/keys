const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

const pg = require("pg");
var pool = null;

const initExpress = (port = 4000) => {
    server.listen(port, () => {
        console.log("START SERVER");
    });
};

const initDB = (host = "db", port = 5432) => {
    const { Pool } = pg;
    pool = new Pool({
        user: "postgres",
        database: "keys",
        password: "example",
        host: host,
        port: port
    });

    pool.query("SELECT * FROM key_type ORDER BY name ASC")
        .then(res => {
            console.log(res.rows);
        })
        .catch(err => {
            console.log("åh nej");
            console.log(err);
        });
};

const getPool = () => pool;

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

const get = (url, handler) => {
    app.get("/api" + url, handler);
};

const post = (url, handler) => {
    app.post("/api" + url, handler);
};

const put = (url, handler) => {
    app.put("/api" + url, handler);
};

const del = (url, handler) => {
    app.delete("/api" + url, handler);
};

const to = promise => {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err]);
};

const getApp = () => app;

module.exports = {
    query,
    get,
    post,
    put,
    del,
    to,
    initExpress,
    initDB,
    getPool,
    getApp //for testing
};
