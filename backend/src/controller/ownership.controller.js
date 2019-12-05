const uuid = require("uuid/v4");
const { getKeyTypes } = require("../db/key-type.db");
const { getKeys } = require("../db/key.db");
const { addOwnership, getOwnerships } = require("../db/ownership.db");
const { get, post, put, del, to, isUUID } = require("../utils");

const handleGetOwnerships = async (req, res) => {
    //todo use Promise.all
    const [err, ownerships] = await to(getOwnerships());
    const [err2, keys] = await to(getKeys());
    const [err3, keyTypes] = await to(getKeyTypes());

    console.log(ownerships);
    console.log(keys);
    console.log(keyTypes);

    res.sendStatus(200);
};

const handleAddOwnership = async (req, res) => {
    const id = uuid();

    if (!req.body) {
        //todo add more validation (yup?)
        res.status(400).send("insuffice data");
        return;
    }

    const [err] = await to(addOwnership(id, data));

    if (err) {
        res.sendStatus(500);
    } else {
        res.status(201).send({ id });
    }
};

get("/ownership", handleGetOwnerships);

post("/ownership", handleAddOwnership);
