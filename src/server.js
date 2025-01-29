const Hapi = require("@hapi/hapi");
const albumPlugin = require("./api/albums/index.js");
const songPlugin = require("./api/songs/index.js");

const AlbumService = require("./service/albumService.js");
const SongService = require("./service/songService.js");

const AlbumsValidator = require("./validator/albums/index.js");
const SongsValidator = require("./validator/songs/index.js");

const start = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
  });

  await server.register([
    {
      plugin: albumPlugin,
      options: {
        service: AlbumService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songPlugin,
      options: {
        service: SongService,
        validator: SongsValidator,
      },
    },
  ]);

  try {
    await server.start();
    console.log("Server running on %s", server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
