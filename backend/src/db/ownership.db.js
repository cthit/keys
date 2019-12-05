const { query } = require("../utils");

const getOwnerships = () =>
    query(
        "SELECT * FROM ownership ORDER BY name",
        null,
        results => results.rows
    );

const getOwnership = id =>
    query("SELECT * FROM ownership WHERE id = $1", [id], results =>
        results > 0 ? results.rows[0] : null
    );

const addOwnership = (id, data) =>
    query(
        "INSERT INTO ownership (id, owner_user_id, start_date, return_date, key_id, deposition, lost_key_penalty) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
            id,
            data.ownerUserId,
            data.startDate,
            data.returnDate,
            data.keyId,
            data.deposition,
            data.lostKeyPenalty
        ]
    );

module.exports = {
    addOwnership,
    getOwnership,
    getOwnerships
};
