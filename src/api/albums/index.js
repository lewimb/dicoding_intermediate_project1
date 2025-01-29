const routes = require(`./routes.js`);
const AlbumHandler = require(`../handler/albumHandler.js`);

module.exports = {
  name: "albums",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const albumHandler = new AlbumHandler(service, validator);
    server.route(routes(albumHandler));
  },
};
