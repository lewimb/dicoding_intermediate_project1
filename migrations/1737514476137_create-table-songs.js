/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("songs", {
    id: {
      type: "VARCHAR(255)",
      primaryKey: true,
    },
    title: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    genre: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    performer: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    duration: {
      type: "integer",
      notNull: true,
    },
    albumId: {
      type: "VARCHAR(255)",
      notNull: true,
      references: "albums",
    },
    created_at: {
      type: "TEXT",
      notNull: true,
    },
    updated_at: {
      type: "TEXT",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("songs");
};
