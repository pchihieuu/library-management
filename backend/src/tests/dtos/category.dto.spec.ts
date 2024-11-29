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
      authors: [],
      categories: []
    };

    const categoryData: ICategory = {
      CategoryID: 'c1',
      CategoryName: 'Science Fiction',
      Description: 'Books related to science fiction',
      books: [bookData]
    };

    const categoryDto = new CategoryDto(categoryData);

    expect(categoryDto.CategoryID).toBe(categoryData.CategoryID);
    expect(categoryDto.CategoryName).toBe(categoryData.CategoryName);
    expect(categoryDto.Description).toBe(categoryData.Description);
    expect(categoryDto.books.length).toBe(1); 
    expect(categoryDto.books[0] instanceof BookDto).toBe(true); 
    expect(categoryDto.books[0].BookID).toBe(bookData.BookID); 
  });

  it('should correctly map category data to CategoryDto when books is empty', () => {
    const categoryData: ICategory = {
      CategoryID: 'c1',
      CategoryName: 'Science Fiction',
      Description: 'Books related to science fiction',
      books: [] 
    };

    const categoryDto = new CategoryDto(categoryData);

    expect(categoryDto.CategoryID).toBe(categoryData.CategoryID);
    expect(categoryDto.CategoryName).toBe(categoryData.CategoryName);
    expect(categoryDto.Description).toBe(categoryData.Description);
    expect(categoryDto.books.length).toBe(0); 
  });

  it('should handle missing optional properties in CategoryDto', () => {
    const categoryData: ICategory = {
      CategoryID: 'c1',
      CategoryName: 'Science Fiction'
    };

    const categoryDto = new CategoryDto(categoryData);

    expect(categoryDto.CategoryID).toBe(categoryData.CategoryID);
    expect(categoryDto.CategoryName).toBe(categoryData.CategoryName);
    expect(categoryDto.books.length).toBe(0);
  });
});
