const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const NotFoundError = require("../../exceptions/NotFoundError");
const InvariantError = require("../../exceptions/InvariantError");

class SongService {
  constructor() {
    this.pool = new Pool();

    this.addSong = this.addSong.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
    this.editSong = this.editSong.bind(this);
    this.getSongById = this.getSongById.bind(this);
    this.getSongs = this.getSongs.bind(this);
  }

  async addSong({ title, genre, performer, duration, albumId }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO songs (id,title,genre,performer,duration,albumId,created_at,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      values: [
        id,
        title,
        genre,
        performer,
        duration,
        albumId,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this.pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Catatan gagal ditambahkan");
    }

    return result.rows[0]?.id;
  }

  async getSongs() {
    const query = {
      text: `SELECT * FROM songs`,
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: `SELECT * FROM songs WHERE id=$1`,
      values: [id],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("lagu tidak ditemukan");
    }

    return result.rows[0];
  }

  async editSong(id, { title, year, genre, performer, duration, albumId }) {
    const updated_at = new Date().toISOString();

    const query = {
      text: `UPDATE songs SET title=$1,year=$2,genre=$3,perfomer=$4,duration=$5,albumId=$6,updated_at=$7 WHERE id=$8`,
      values: [
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
        updated_at,
        id,
      ],
    };

    const result = this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("lagu tidak ditemukan");
    }

    return result.rows[0]?.id;
  }

  async deleteSong(id) {
    const query = {
      text: `DELETE FROM songs WHERE id=$1 RETURNING id`,
      values: [id],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("lagu tidak ditemukan");
    }
    return result.rows[0]?.id;
  }
}

module.exports = SongService;
