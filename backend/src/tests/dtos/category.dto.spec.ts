import { BookDto } from "../../common/dtos/book.dto";
import { CategoryDto } from "../../common/dtos/category.dto";
import { IBook } from "../../interfaces/book.interface";
import { ICategory } from "../../interfaces/category.interface";

describe('CategoryDto', () => {
  it('should correctly map category data to CategoryDto when books are provided', () => {
    const bookData: IBook = {
      BookID: 'b1',
      Title: 'Sample Book',
      ISBN: '123-456-789',
      AuthorBook: 'author-1',
      CategoryBook: 'category-1',
      authors: [], // Add authors if needed
      categories: [] // Add categories if needed
    };

    const categoryData: ICategory = {
      CategoryID: 'c1',
      CategoryName: 'Science Fiction',
      Description: 'Books related to science fiction',
      books: [bookData]
    };

    const categoryDto = new CategoryDto(categoryData);

    // Check CategoryDto properties
    expect(categoryDto.CategoryID).toBe(categoryData.CategoryID);
    expect(categoryDto.CategoryName).toBe(categoryData.CategoryName);
    expect(categoryDto.Description).toBe(categoryData.Description);
    expect(categoryDto.books.length).toBe(1); // Ensure books is not empty
    expect(categoryDto.books[0] instanceof BookDto).toBe(true); // Ensure books[0] is a BookDto
    expect(categoryDto.books[0].BookID).toBe(bookData.BookID); // Ensure correct mapping for book
  });

  it('should correctly map category data to CategoryDto when books is empty', () => {
    const categoryData: ICategory = {
      CategoryID: 'c1',
      CategoryName: 'Science Fiction',
      Description: 'Books related to science fiction',
      books: [] // Empty books array
    };

    const categoryDto = new CategoryDto(categoryData);

    // Check CategoryDto properties
    expect(categoryDto.CategoryID).toBe(categoryData.CategoryID);
    expect(categoryDto.CategoryName).toBe(categoryData.CategoryName);
    expect(categoryDto.Description).toBe(categoryData.Description);
    expect(categoryDto.books.length).toBe(0); // Ensure books is an empty array
  });

  it('should handle missing optional properties in CategoryDto', () => {
    const categoryData: ICategory = {
      CategoryID: 'c1',
      CategoryName: 'Science Fiction'
      // No Description and books
    };

    const categoryDto = new CategoryDto(categoryData);

    // Check CategoryDto properties
    expect(categoryDto.CategoryID).toBe(categoryData.CategoryID);
    expect(categoryDto.CategoryName).toBe(categoryData.CategoryName);
    expect(categoryDto.books.length).toBe(0); // Ensure books is an empty array
  });
});
