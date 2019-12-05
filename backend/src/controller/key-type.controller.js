const uuid = require("uuid/v4");
const { get, post, put, del, to, isUUID } = require("../utils");
const {
    getKeyTypes,
    getKeyType,
    addKeyType,
    editKeyType,
    deleteKeyType
} = require("../db/key-type.db");

const handleGetKeyTypes = async (req, res) => {
    const [err, keyTypes] = await to(getKeyTypes());

    if (err) {
        res.sendStatus(500);
    } else {
        res.status(200).send(keyTypes);
    }
};

const handleGetKeyType = async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        res.status(400).send("id is not an UUID");
        return;
    }

    const [err, keyType] = await to(getKeyType(id));

    if (err) {
        res.sendStatus(500);
    } else {
        if (keyType == null || Object.keys(keyType).length === 0) {
            res.status(404).send("resource doesn't exist");
        } else {
            res.status(200).send(keyType);
        }
    }
};

const handleAddKeyType = async (req, res) => {
    const id = uuid();
    const { name } = req.body;

    if (
        req.body == null ||
        req.body.name == null ||
        req.body.name.trim() === ""
    ) {
        res.status(400).send("no name provided");
        return;
    }

    const [err] = await to(addKeyType(id, name));

    if (err) {
        res.sendStatus(500);
        console.log(err);
    } else {
        res.status(201).send({ id });
    }
};

const handleEditKeyType = async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        res.status(400).send("id is not an UUID");
        return;
    }

    const { name } = req.body;
    const [err, rowCount] = await to(editKeyType(id, name));

    if (err) {
        res.sendStatus(500);
    } else {
        if (rowCount === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    }
};

const handleDeleteKeyType = async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        res.status(400).send("id is not an UUID");
        return;
    }

    const [err, rowCount] = await to(deleteKeyType(id));

    if (err) {
        res.sendStatus(500);
    } else {
        if (rowCount === 0) {
            res.status(404).send("resource doesn't exist");
        } else {
            res.sendStatus(200);
        }
    }
};

get("/key_type", handleGetKeyTypes);
get("/key_type/:id", handleGetKeyType);

post("/key_type", handleAddKeyType);

put("/key_type/:id", handleEditKeyType);

del("/key_type/:id", handleDeleteKeyType);
