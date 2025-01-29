const routes = require(`./routes.js`);
const SongsHandler = require(`../handler/songHandler.js`);

module.exports = {
  name: "songs",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const songHandler = new SongsHandler(service, validator);
    server.route(routes(songHandler));
  },
};
