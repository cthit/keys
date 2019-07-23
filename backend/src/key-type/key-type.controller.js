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

    if (err) res.send(500);
    else res.send(keyTypes);
};

const handleGetKeyType = async (req, res) => {
    const { id } = req.params;
    const [err, keyType] = await getKeyType(id);

    if (err) res.send(500);
    else res.send(keyType);
};

const handleAddKeyType = async (req, res) => {
    const [err] = await addKeyType(name);

    if (err) res.send(500);
    else res.send(201);
};

const handleEditKeyType = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const [err] = await editKeyType(id, name);

    if (err) res.send(500);
    else res.send(201);
};

const handleDeleteKeyType = async (req, res) => {
    const { id } = req.params;
    const [err] = await deleteKeyType(id);

    if (err) res.send(500);
    else res.send(200);
};

get("/key_type", handleGetKeyTypes);
get("/key_type/:id", handleGetKeyType);

post("/key_type", handleAddKeyType);

put("/key_type/:id", handleEditKeyType);

del("/key_type/:id", handleDeleteKeyType);
