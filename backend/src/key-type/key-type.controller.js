const { get, post, put, del } = require("../utils");
const {
    getKeyTypes,
    getKeyType,
    addKeyType,
    editKeyType,
    deleteKeyType
} = require("./key-type.db");

const handleGetKeyTypes = async (req, res) => {
    const keyTypes = await getKeyTypes();
    res.send(keyTypes);
};

const handleGetKeyType = async (req, res) => {
    const { id } = req.params;
    const keyType = await getKeyType(id);
    res.send(keyType);
};

const handleAddKeyType = async (req, res) => {
    await addKeyType(name);
    res.send(201);
};

const handleEditKeyType = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    await editKeyType(id, name);
    res.send(201);
};

const handleDeleteKeyType = async (req, res) => {
    const { id } = req.params;
    await deleteKeyType(id);
    res.send(200);
};

get("/key_type", handleGetKeyTypes);
get("/key_type/:id", handleGetKeyType);

post("/key_type", handleAddKeyType);

put("/key_type/:id", handleEditKeyType);

del("/key_type/:id", handleDeleteKeyType);
