const Hapi = require("@hapi/hapi");
const routes = require("./api/route.js");
require("dotenv").config();

const start = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
  });

  server.route(routes);

  try {
    await server.start();
    console.log("Server running on %s", server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
