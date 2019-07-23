const uuid = require("uuid/v4");
const { query } = require("../db-utils");

const getKeyTypes = () =>
    query(
        "SELECT * FROM key_type ORDER BY name ASC",
        null,
        results => results.rows
    );
const getKeyType = id =>
    query("SELECT * FROM key_type WHERE id = $1", [id], results =>
        results.length > 0 ? results.rows[0] : {}
    );

const addKeyType = name =>
    query("INSERT INTO key_type (id, name) VALUES ($1, $2)", [uuid(), name]);

const editKeyType = (id, name) =>
    query("UPDATE key_type SET name = $1 WHERE id = $2", [name, id]);

const deleteKeyType = id => query("DELETE FROM key_type WHERE id = $1", [id]);

module.exports = {
    getKeyType,
    getKeyTypes,
    addKeyType,
    editKeyType,
    deleteKeyType
};
