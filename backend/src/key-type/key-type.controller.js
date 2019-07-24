const uuid = require("uuid/v4");
const { get, post, put, del, to } = require("../utils");
const {
    getKeyTypes,
    getKeyType,
    addKeyType,
    editKeyType,
    deleteKeyType
} = require("./key-type.db");

const handleGetKeyTypes = async (req, res) => {
    const [err, keyTypes] = await to(getKeyTypes());

    if (err) res.sendStatus(500);
    else res.status(200).send(keyTypes);
};

const handleGetKeyType = async (req, res) => {
    const { id } = req.params;
    const [err, keyType] = await to(getKeyType(id));

    if (err) res.sendStatus(500);
    else res.status(200).send(keyType);
};

const handleAddKeyType = async (req, res) => {
    const id = uuid();
    const { name } = req.body;
    const [err] = await to(addKeyType(id, name));

    if (err) res.sendStatus(500);
    else
        res.status(201).send({
            id,
            name
        });
};

const handleEditKeyType = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const [err] = await to(editKeyType(id, name));

    if (err) res.sendStatus(500);
    else res.sendStatus(201);
};

const handleDeleteKeyType = async (req, res) => {
    const { id } = req.params;
    const [err] = await to(deleteKeyType(id));

    if (err) res.send(500);
    else res.send(200);
};

get("/key_type", handleGetKeyTypes);
get("/key_type/:id", handleGetKeyType);

post("/key_type", handleAddKeyType);

put("/key_type/:id", handleEditKeyType);

del("/key_type/:id", handleDeleteKeyType);
