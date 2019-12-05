const { query } = require("../utils");

const getKeys = () =>
    query("SELECT * FROM key ORDER BY name", null, results => results.rows);

const getKey = id =>
    query("SELECT * FROM key WHERE id = $1", [id], results =>
        results.rowCount > 0 ? results.rows[0] : null
    );

const addKey = (id, data) =>
    query(
        "INSERT INTO key (id, name, status, key_type_id) VALUES ($1, $2, $3, $4)",
        [id, data.name, data.status, data.keyType]
    );

const editKey = (id, data) =>
    query(
        "UPDATE key SET name = $2, status = $3, key_type_id = $4 WHERE id = $1",
        [data.id, data.name, data.status, data.keyType],
        results => results.rowCount
    );

const deleteKey = id =>
    query("DELETE FROM key WHERE id = $1", [id], results => results.rowCount);

module.exports = {
    getKeys,
    getKey,
    addKey,
    editKey,
    deleteKey
};
