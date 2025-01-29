const SongPayloadSchema = require(`./schema.js`);
const InvariantError = require("../../exceptions/InvariantError.js");

const SongsValidation = {
  SongValidatePayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongsValidation;
