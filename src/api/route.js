const routes = (handler) => [
  {
    method: "POST",
    path: "/albums",
    handler: handler.addAlbumHandler,
  },
  {
    method: "GET",
    path: "/albums/{id}",
    handler: handler.getAlbumByIdHandler,
  },
  {
    method: "PUT",
    path: "/albums/{id}",
    handler: handler.editAlbumHandler,
  },
  {
    method: "DELETE",
    path: "/albums/{id}",
    handler: handler.deleteAlbumHandler,
  },
  {
    method: "POST",
    path: "/songs",
    handler: handler.addSongHandler,
  },
  {
    method: "GET",
    path: "/songs",
    handler: handler.getAllSongsHandler,
  },
  {
    method: "GET",
    path: "/songs/{id}",
    handler: handler.getSongByIdHandler,
  },
  {
    method: "PUT",
    path: "/songs/{id}",
    handler: handler.editSongHandler,
  },
  {
    method: "DELETE",
    path: "/songs/{id}",
    handler: handler.deleteSongHandler,
  },
];

module.exports = routes;
