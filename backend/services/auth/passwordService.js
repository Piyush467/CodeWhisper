const bcrypt = require('bcryptjs');

const passwordService = {
  /**
   * Hashes a plain text password.
   * @param {string} password 
   * @returns {Promise<string>}
   */
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  /**
   * Compares a plain text password with a hash.
   * @param {string} password 
   * @param {string} hashedPassword 
   * @returns {Promise<boolean>}
   */
  comparePassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  }
};

module.exports = passwordService;
