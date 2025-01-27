const { AlbumPayloadSchema } = require(`./schema.js`);

const AlbumsValidator = {
  ValidateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
