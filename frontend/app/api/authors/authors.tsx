import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/authors`;

export const fetchAuthors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createAuthor = async (newAuthor: {
  FullName: string;
  Bio: string;
}) => {
  const response = await axios.post(API_URL, newAuthor);
  return response.data;
};

export const updateAuthor = async (updatedAuthor: {
  AuthorID: number;
  FullName: string;
  Bio: string;
}) => {
  const response = await axios.patch(
    `${API_URL}/${updatedAuthor.AuthorID}`,
    updatedAuthor
  );
  return response.data;
};

export const deleteAuthor = async (AuthorID: number) => {
  const response = await axios.delete(`${API_URL}/${AuthorID}`);
  return response.data;
};
