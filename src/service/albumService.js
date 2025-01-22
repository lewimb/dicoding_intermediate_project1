const { Pool } = require("pg");
const { nanoid } = require("nanoid");

class AlbumService {
  constructor() {
    this.pool = new Pool();
  }

  addAlbum({ name, year }) {}
}
