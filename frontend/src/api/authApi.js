import api from './axios';

export const authApi = {
  /**
   * Registers a new user account.
   */
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  /**
   * Log in user.
   */
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  /**
   * Log out user.
   */
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  /**
   * Checks current user status (JWT session check).
   */
  me: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
