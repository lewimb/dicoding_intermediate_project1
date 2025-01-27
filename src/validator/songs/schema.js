const joi = require(`joi`);

const SongPayloadSchema = joi.object({
  title: joi.string().required(),
  genre: joi.string().required(),
  performer: joi.string().required(),
  duration: joi.number().required(),
  albumId: joi.string().required(),
});

module.exports = { SongPayloadSchema };
