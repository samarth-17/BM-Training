import axios from "axios";

export const fetchUsers = async () => {
  const response = await axios.get("https://dummyjson.com/users");
  return response.data.users;
};

export const fetchUserById = async (userId) => {
  const response = await axios.get(`https://dummyjson.com/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await axios.put(`https://dummyjson.com/users/${userId}`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};