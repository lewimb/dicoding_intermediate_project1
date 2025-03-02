const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const NotFoundError = require("../exceptions/NotFoundError");

class AlbumService {
  constructor() {
    this.pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO albums VALUES ($1,$2,$3,$4,$5) RETURNING id",
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this.pool.query(query);

    // if (!result.rows[0].id) {
    //   throw new InvariantError("Album gagal ditambahkan");
    // }

    return result.rows[0]?.id;
  }

  async getAlbums() {
    const query = {
      text: `SELECT * FROM albums`,
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getAlbumById({ id }) {
    const query = {
      text: `SELECT * FROM albums WHERE id=$1`,
      values: [id],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Album tidak ditemukan");
    }

    return result.rows[0];
  }

  async editAlbumById(id, { name, year }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: `UPDATE albums SET name=$1, year=$2 ,updated_at=$3 WHERE id=$4 RETURNING id`,
      values: [name, year, updatedAt, id],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Album tidak ditemukan");
    }

    return result;
  }

  async deleteAlbumById(id) {
    const query = {
      text: `DELETE FROM albums WHERE id=$1 RETURNING id`,
      values: [id],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Album tidak ditemukan");
    }

    return;
  }
}

module.exports = AlbumService;
