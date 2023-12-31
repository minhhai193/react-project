import axios from './axios';

const fetchAllUsers = (page) => {
  return axios.get(`/api/users?page=${page}`);
}

const postCreateUser = (firstName, lastName) => {
  return axios.post('/api/users', { name: firstName, job: lastName});
}

const putUpdateUser = (userID, firstName, lastName) => {
  return axios.put(`/api/users/${userID}`, { name: firstName, job: lastName});
}

const loginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
}

export { fetchAllUsers, postCreateUser, putUpdateUser, loginApi };