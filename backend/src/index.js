const utils = require("./utils");
utils.initExpress();
utils.initDB();

require("./key-type/key-type.controller");
require("./key/key.controller");
