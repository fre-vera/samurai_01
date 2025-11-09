import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a2915d57-61c6-4282-a06f-5e8aaaf4d142',
  },
});

export const usersAPI = {
  getUsers: async (currentPage = 1, pageSize = 10) => {
    const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
    return response.data;
  },
  follow: async (userId) => {
    const response = await instance.post(`follow/${userId}`, {});
    return response.data;
  },
  unfollow: async (userId) => {
    const response = await instance.delete(`follow/${userId}`);
    return response.data;
  },
};

export const authApi = {
  getAuth: async () => {
    const response = await instance.get(`auth/me`);
    return response.data;
  },
  login: async (email, password, rememberMe = false) => {
    const response = await instance.post(`auth/login`, { email, password, rememberMe });
    return response.data;
  },
  logout: async () => {
    const response = await instance.delete(`auth/login`);
    return response.data;
  },
};

export const profileApi = {
  getProfile: async (userId) => {
    const response = await instance.get(`profile/${userId}`);
    return response.data;
  },
  getStatus: async (userId) => {
    const response = await instance.get(`profile/status/${userId}`);
    return response.data;
  },
  updateStatus: async (status) => {
    const response = await instance.put(`profile/status`, { status });
    return response.data;
  },
  updatePhoto: async (photoFile) => {
    const formData = new FormData();
    formData.append('image', photoFile);
    const response = await instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
