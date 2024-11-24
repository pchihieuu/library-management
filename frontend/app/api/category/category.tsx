import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const fetchCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCategory = async (newCategory: {
  CategoryName: string;
  Description?: string;
}) => {
  const response = await axios.post(API_URL, newCategory);
  return response.data;
};

export const updateCategory = async (updatedCategory: {
  CategoryID: number;
  CategoryName: string;
  Description?: string;
}) => {
  const response = await axios.patch(
    `${API_URL}/${updatedCategory.CategoryID}`,
    updatedCategory
  );
  return response.data;
};

export const deleteCategory = async (CategoryID: number) => {
  const response = await axios.delete(`${API_URL}/${CategoryID}`);
  return response.data;
};

export const fetchCategoryById = async (CategoryID: number) => {
  const response = await axios.get(`${API_URL}/${CategoryID}`);
  return response.data;
};
