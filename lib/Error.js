class TwitterError extends Error {
  constructor(error) {
    super(error.message);
    if (error.code) {
      this.code = error.code;
    }
    if (error.detail) {
      this.detail = error.detail;
    }
  }
}

module.exports = TwitterError;
