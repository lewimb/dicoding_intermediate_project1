const SongPayloadSchema = require(`./schema.js`);

const SongsValidation = {
  SongValidatePayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = SongsValidation;
