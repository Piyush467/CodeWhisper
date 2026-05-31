const validators = {
  /**
   * Checks if email is valid.
   * @param {string} email 
   * @returns {boolean}
   */
  isValidEmail: (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(String(email).toLowerCase());
  },

  /**
   * Checks if password is valid (at least 6 characters).
   * @param {string} password 
   * @returns {boolean}
   */
  isValidPassword: (password) => {
    return typeof password === 'string' && password.length >= 6;
  },

  /**
   * Checks if value is empty.
   * @param {any} val 
   * @returns {boolean}
   */
  isEmpty: (val) => {
    return (
      val === undefined ||
      val === null ||
      (typeof val === 'object' && Object.keys(val).length === 0) ||
      (typeof val === 'string' && val.trim().length === 0)
    );
  }
};

module.exports = validators;
