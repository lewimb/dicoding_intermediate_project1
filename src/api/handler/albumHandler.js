class AlbumHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.addAlbum = this.addAlbum.bind(this);
    this.deleteAlbum = this.deleteAlbum.bind(this);
    this.editAlbum = this.editAlbum.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
    this.getAlbumById = this.getAlbumById.bind(this);
  }

  async addAlbum(request, h) {
    try {
      this.validator.ValidateAlbumPayload(request.payload);

      const album_id = await this.service.addAlbum(request.payload);

      const response = h.response({
        status: "success",
        data: {
          album_id: album_id,
        },
      });
      response.code(201);
      return response;
    } catch (err) {
      if (err.name == `InvariantError`) {
        const response = h.response({
          status: "fail",
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: err.message,
      });
      response.code(500);
      return response;
    }
  }

  async getAlbums(_, h) {
    const albums = await this.service.getAlbums();

    return h
      .response({
        status: "success",
        data: { albums },
      })
      .code(200);
  }

  async getAlbumById(request, h) {
    try {
      const { id } = request.params;
      const album = await this.service.getAlbumById(id);

      return h
        .response({
          status: `success`,
          data: {
            album: album,
          },
        })
        .code(200);
    } catch (err) {
      if (err.name == `NotFoundError`) {
        const response = h.response({
          status: "fail",
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: err.message,
      });
      response.code(500);
      return response;
    }
  }

  async deleteAlbum(request, h) {
    try {
      const { id } = request.params;
      await this.service.deleteAlbumById(id);

      return h
        .response({
          status: `success`,
          message: `succesfully remove target album`,
        })
        .code(200);
    } catch (err) {
      if (err.name == `NotFoundError`) {
        const response = h.response({
          status: "fail",
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: err.message,
      });
      response.code(500);
      return response;
    }
  }

  async editAlbum(request, h) {
    try {
      const { id } = request.params;
      this.validator.ValidateAlbumPayload(request.payload);
      const result = await this.service.editAlbumById(id, request.payload);

      return h
        .response({
          status: `success`,
          message: `Album has been edited`,
          body: {
            data: result,
          },
        })
        .code(200);
    } catch (err) {
      if (err.name == `NotFoundError`) {
        const response = h.response({
          status: "fail",
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: err.message,
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = AlbumHandler;
