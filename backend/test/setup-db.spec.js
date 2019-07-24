const utils = require("../src/utils");

const tables = ["key-type"];

before(() => {
    utils.initExpress(4001);
    require("../src/key-type/key-type.controller");
    // utils.initDB("db_test", 5433);
    utils.initDB();
});

beforeEach(() => {
    // tables.forEach(table => {
    //     utils.getPool().query("TRUNCATE " + table + " RESTART IDENTITY");
    // });
});
