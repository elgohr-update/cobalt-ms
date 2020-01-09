const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const log = require("./log");
const RichResponse = require("./api/rich-response");

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(require("./expressLog"));

log.debug("Registering api");
require("./api")(app);

app.use("*", (req, res) => {
    new RichResponse(req, res).notFound("Route not found");
});

app.listen(config.webPort, () =>
    log.info(`Listening on port ${config.webPort}`)
);
