const { query } = require("../utils");

const getKeyTypes = () =>
    query(
        "SELECT * FROM key_type ORDER BY name",
        null,
        results => results.rows
    );
const getKeyType = id =>
    query("SELECT * FROM key_type WHERE id = $1", [id], results =>
        results.rowCount > 0 ? results.rows[0] : null
    );

const addKeyType = (id, name) =>
    query("INSERT INTO key_type (id, name) VALUES ($1, $2)", [id, name]);

const editKeyType = (id, name) =>
    query(
        "UPDATE key_type SET name = $1 WHERE id = $2",
        [name, id],
        results => results.rowCount
    );

const deleteKeyType = id =>
    query(
        "DELETE FROM key_type WHERE id = $1",
        [id],
        results => results.rowCount
    );

module.exports = {
    getKeyType,
    getKeyTypes,
    addKeyType,
    editKeyType,
    deleteKeyType
};
