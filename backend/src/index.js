const utils = require("./utils");
utils.initExpress();
utils.initDB();

require("./key-type/key-type.controller");
