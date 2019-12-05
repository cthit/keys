const axios = require("axios");
const utils = require("./utils");
utils.initExpress();
utils.initDB();

utils.getApp().use((req, res, next) => {
    console.log(req.method);
    console.log(req.headers.authorization);
    next();
});

require("./controller/key.controller");
require("./controller/key-type.controller");
require("./controller/ownership.controller");
