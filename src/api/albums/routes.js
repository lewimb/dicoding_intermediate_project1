const routes = (handler) => [
  {
    method: "POST",
    path: "/albums",
    handler: handler.addAlbum,
  },
  {
    method: "GET",
    path: "/albums/{id}",
    handler: handler.getAlbumById,
  },
  {
    method: "GET",
    path: "/albums",
    handler: handler.getAlbums,
  },
  {
    method: "PUT",
    path: "/albums/{id}",
    handler: handler.editAlbum,
  },
  {
    method: "DELETE",
    path: "/albums/{id}",
    handler: handler.deleteAlbum,
  },
];

module.exports = routes;
