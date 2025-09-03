import api from './axios';

// Set to true to use mock data until you get valid credentials
const USE_MOCK_DATA = true;

export const authAPI = {
  login: async (credentials) => {
    if (USE_MOCK_DATA) {
      console.log('Using mock data for login (real API requires valid credentials)');
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (credentials.userName && credentials.password) {
            resolve({
              data: {
                apiAuthTokens: {
                  token: 'mock-jwt-token-' + Date.now()
                },
                user: {
                  userName: credentials.userName,
                  id: 1,
                  email: credentials.userName
                }
              }
            });
          } else {
            reject({
              response: {
                data: {
                  message: 'Username and password are required'
                }
              }
            });
          }
        }, 1000);
      });
    }
    
    // Real API call
    try {
      console.log('Attempting real API login');
      const response = await api.post('/Accounts/Login', {
        userName: credentials.userName,
        password: credentials.password,
        branch_id: 1
      });
      
      return response;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  }
};