import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

export enum UserRole {
  Admin = 'Admin',
  Member = 'Member',
  Guest = 'Guest'
}

const isValidRole = (role: string): boolean => {
  return Object.values(UserRole).includes(role as UserRole);
};

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (newUser: {
  FullName: string;
  Email: string;
  Role: string;
}) => {
  if (!isValidRole(newUser.Role)) {
    throw new Error('Invalid role');
  }
  const response = await axios.post(API_URL, newUser);
  return response.data;
};

export const updateUser = async (updatedUser: {
  UserID: number;
  FullName: string;
  Email: string;
  Role: string;
}) => {
  if (!isValidRole(updatedUser.Role)) {
    throw new Error('Invalid role');
  }
  const response = await axios.patch(
    `${API_URL}/${updatedUser.UserID}`,
    updatedUser
  );
  return response.data;
};

export const deleteUser = async (UserID: number) => {
  const response = await axios.delete(`${API_URL}/${UserID}`);
  return response.data;
};

export const fetchUserById = async (UserID: number) => {
  const response = await axios.get(`${API_URL}/${UserID}`);
  return response.data;
};
