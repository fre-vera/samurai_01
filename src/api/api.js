import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a2915d57-61c6-4282-a06f-5e8aaaf4d142',
  },
});

export const usersAPI = {
  getUsers: (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow: (userId) => {
    return instance.post(`follow/${userId}`, {})
      .then((response) => response.data);
  },
  unfollow: (userId) => {
    return instance.delete(`follow/${userId}`)
      .then((response) => response.data);
  },
};

export const authApi = {
  getAuth: () => {
    return instance.get(`auth/me`)
      .then((response) => response.data);
  },
  login: (email, password, rememberMe = false) => {
    return instance.post(`auth/login`, { email, password, rememberMe })
      .then((response) => response.data);
  },
  logout: () => {
    return instance.delete(`auth/login`)
      .then((response) => response.data);
  },
};

export const profileApi = {
  getProfile: (userId) => {
    return instance.get(`profile/${userId}`)
      .then((response) => response.data);
  },
  getStatus: (userId) => {
    return instance.get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateStatus: (status) => {
    return instance.put(`profile/status`, { status })
      .then((response) => response.data);
  },
};
