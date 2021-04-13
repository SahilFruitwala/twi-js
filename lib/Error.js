class TwitterError extends Error {
  /**
   * 
   * @param {Object} error 
   */
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
