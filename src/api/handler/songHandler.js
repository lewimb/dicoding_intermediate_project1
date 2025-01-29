class SongHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.addSong = this.addSong.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
    this.editSong = this.editSong.bind(this);
    this.getSongById = this.getSongById.bind(this);
    this.getSongs = this.getSongs.bind(this);
  }

  async addSong(request, h) {
    try {
      this.validator.SongValidatePayload(request.payload);
      const songId = await this.service.addSong(request.payload);

      return h
        .response({
          status: `success`,
          data: {
            songId,
          },
        })
        .code(201);
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

  async getSongs(_, h) {
    const songs = await this.service.getSongs();

    return h
      .response({
        status: `success`,
        data: {
          songs: songs,
        },
      })
      .code(200);
  }

  async getSongById(request, h) {
    try {
      const { id } = request.params;
      const song = await this.service.getSongById(id);

      return h
        .response({
          status: `success`,
          data: {
            song: song,
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

  async editSong(request, h) {
    try {
      this.validator.SongValidatePayload(request.payload);
      const { id } = request.params;

      const songId = await this.service.editSong(id, request.payload);

      return h
        .response({
          status: `success`,
          message: `Song has been updated`,
          data: {
            songId,
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

  async deleteSong(request, h) {
    try {
      const { id } = request.params;

      await this.service.deleteSong(id);

      return h
        .response({
          status: `success`,
          message: `Song has been deleted`,
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

module.exports = SongHandler;
