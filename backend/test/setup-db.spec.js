const utils = require("../src/utils");

const tables = ["key_type"];

before(() => {
    // utils.initExpress(4001);
    require("../src/key-type/key-type.controller");
    utils.initDB("0.0.0.0", 5432);
});

beforeEach(() => {
    tables.forEach(table => {
        utils.getPool().query("TRUNCATE " + table + " RESTART IDENTITY");
    });
});
