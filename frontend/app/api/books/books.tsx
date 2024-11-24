import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/books`;

// Define the Status ENUM
type BookStatus = 'available' | 'borrowed' | 'reserved';

// Define Book type based on the new response data structure
type Book = {
  BookID: string; // UUID type for BookID
  Title: string;
  ISBN: string;
  PublicationYear?: number;
  Description?: string;
  AuthorBook?: string;
  CategoryBook?: string;
  TotalCopies?: number;
  AvailableCopies?: number;
  Status: BookStatus; // Use the BookStatus ENUM type
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await axios.get(API_URL);
  return response.data; // The API returns an array of books
};

export const createBook = async (newBook: {
  Title: string;
  ISBN: string;
  PublicationYear?: number;
  Description?: string;
  AuthorBook?: string;
  CategoryBook?: string;
  TotalCopies?: number;
  AvailableCopies?: number;
  Status: BookStatus;
}) => {
  // Ensure the object includes all required fields, even if empty
  const payload = {
    Title: newBook.Title || '',
    ISBN: newBook.ISBN || '',
    PublicationYear: newBook.PublicationYear ?? null,
    Description: newBook.Description || '',
    AuthorBook: newBook.AuthorBook || '',
    CategoryBook: newBook.CategoryBook || '',
    TotalCopies: newBook.TotalCopies ?? 0,
    AvailableCopies: newBook.AvailableCopies ?? 0,
    Status: newBook.Status
  };
  const response = await axios.post(API_URL, payload);
  return response.data;
};

export const updateBook = async (updatedBook: {
  BookID: string; // UUID type for BookID
  Title?: string;
  ISBN?: string;
  PublicationYear?: number;
  Description?: string;
  AuthorBook?: string;
  CategoryBook?: string;
  TotalCopies?: number;
  AvailableCopies?: number;
  Status?: BookStatus;
}) => {
  const payload = {
    Title: updatedBook.Title || '',
    ISBN: updatedBook.ISBN || '',
    PublicationYear: updatedBook.PublicationYear ?? null,
    Description: updatedBook.Description || '',
    AuthorBook: updatedBook.AuthorBook || '',
    CategoryBook: updatedBook.CategoryBook || '',
    TotalCopies: updatedBook.TotalCopies ?? 0,
    AvailableCopies: updatedBook.AvailableCopies ?? 0,
    Status: updatedBook.Status ?? 'available'
  };

  const response = await axios.patch(
    `${API_URL}/${updatedBook.BookID}`,
    payload
  );
  return response.data;
};

export const deleteBook = async (BookID: string) => {
  const response = await axios.delete(`${API_URL}/${BookID}`);
  return response.data;
};
