const hapi = require("@hapi/hapi");

const init = async () => {
  const server = hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
  });

  await server.start();
};

init();
