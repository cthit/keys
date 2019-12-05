const uuid = require("uuid/v4");
const { find } = require("lodash");
const { put, del, post, get, to, isUUID } = require("../utils");
const { addKey, getKeys, getKey, editKey, deleteKey } = require("../db/key.db");
const { getKeyType, getKeyTypes } = require("../db/key-type.db");

const handleAddKey = async (req, res) => {
    const id = uuid();
    const { name } = req.body;
    const status = "normal";

    if (req.body == null || name == null || name.trim() === "") {
        res.status(400).send("no name provided");
        return;
    }

    const [err] = await to(addKey(id, { status, ...req.body }));

    if (err) {
        res.sendStatus(500);
    } else {
        res.status(201).send({ id });
    }
};
const handleGetKeys = async (req, res) => {
    const [err, keys] = await to(getKeys());
    const [err2, keyTypes] = await to(getKeyTypes());

    if (err || err2) {
        res.sendStatus(500);
        console.log(err);
    } else {
        res.status(200).send(
            keys.map(key => {
                const keyType = find(keyTypes, { id: key.key_type_id });
                delete key.key_type_id;
                key.keyType = keyType.id;
                key.keyTypeName = keyType.name;
                return key;
            })
        );
    }
};

const handleGetKey = async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        res.status(400).send("id is not an UUID");
        return;
    }

    const [err, key] = await to(getKey(id));
    if (key == null || Object.keys(key).length === 0) {
        res.status(404).send("resource doesn't exist");
        return;
    }
    const [err2, keyType] = await to(getKeyType(key.key_type_id));

    if (err || err2) {
        res.sendStatus(500);
        console.log(err);
        console.log(err2);
    } else {
        delete key.key_type_id;
        key.keyType = keyType.id;
        key.keyTypeName = keyType.name;
        res.status(200).send(key);
    }
};

const handleEditKey = async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        res.status(400).send("id is not an UUID");
        return;
    }

    const [err, rowCount] = await to(editKey(id, req.body));

    if (err) {
        res.sendStatus(500);
        console.log(err);
    } else {
        if (rowCount === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    }
};

const handleDeleteKey = async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        res.status(400).send("id is not an UUID");
        return;
    }

    const [err, rowCount] = await to(deleteKey(id));

    if (err) {
        res.sendStatus(500);
        console.log(err);
    } else {
        if (rowCount === 0) {
            res.status(404).send("resource doesn't exist");
        } else {
            res.sendStatus(200);
        }
    }
};

get("/key", handleGetKeys);
get("/key/:id", handleGetKey);

post("/key", handleAddKey);

put("/key/:id", handleEditKey);

del("/key/:id", handleDeleteKey);
