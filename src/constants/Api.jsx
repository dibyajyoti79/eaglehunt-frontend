import axios from 'axios';

// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'https://eaglehunt-backend.onrender.com';


const Api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to attach the access token to outgoing requests
Api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await Api.refreshAuthToken(refreshToken);
          const newAccessToken = response.access_token;
          localStorage.setItem('accessToken', newAccessToken);

          // Retry the original request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return Api(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // Optionally handle logout or token expiry here
        }
      }
    }

    return Promise.reject(error);
  }
);

// API methods
Api.createUser = async (userData) => {
  try {
    const response = await Api.post('/users', userData, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

Api.getToken = async (credentials) => {
  try {
    const response = await Api.post('/auth/token', credentials, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

Api.getUserDetails = async (accessToken) => {
  try {
    const response = await Api.post('/users/me', {}, {
      headers: {
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

Api.refreshAuthToken = async (refreshToken) => {
  try {
    const response = await Api.post('/auth/refresh', {}, {
      headers: {
        accept: 'application/json',
        'refresh-token': refreshToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

Api.verifyAccount = async (email, otp) => {
  try {
    const response = await Api.post(
      '/verify-account/',
      {},
      {
        headers: {
          accept: 'application/json',
        },
        params: {
          email: email,
          otp: otp,
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error verifying account:', error);
    throw error;
  }
};

export default Api;
