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
    query
};
