import { AuthorDto } from "../../common/dtos/author.dto";
import { BookDto } from "../../common/dtos/book.dto";
import { CategoryDto } from "../../common/dtos/category.dto";
import { IBook } from "../../interfaces/book.interface";


describe('BookDto', () => {
  it('should create a valid BookDto object', () => {
    const mockBook: IBook = {
      BookID: '12345',
      Title: 'Sample Book Title',
      ISBN: '978-3-16-148410-0',
      AuthorBook: 'Author_001',
      CategoryBook: 'Category_001',
      authors: [
        { AuthorID: '1', FullName: 'Author One', books: [] },
        { AuthorID: '2', FullName: 'Author Two', books: [] }
      ],
      categories: [
        { 
          CategoryID: '101', 
          CategoryName: 'Science', 
          Description: 'Books about science',  // Cung cấp mô tả
          books: []  // Bạn có thể để mảng trống hoặc thêm sách nếu cần
        },
        { 
          CategoryID: '102', 
          CategoryName: 'Fiction', 
          Description: 'Books in the fiction genre', // Cung cấp mô tả
          books: []  // Cũng có thể để mảng trống
        }
      ]
    };

    const bookDto = new BookDto(mockBook);

    expect(bookDto.BookID).toBe(mockBook.BookID);
    expect(bookDto.Title).toBe(mockBook.Title);
    expect(bookDto.ISBN).toBe(mockBook.ISBN);
    expect(bookDto.authors).toHaveLength(mockBook.authors.length);
    expect(bookDto.authors[0]).toBeInstanceOf(AuthorDto);
    expect(bookDto.categories).toHaveLength(mockBook.categories.length);
    expect(bookDto.categories[0]).toBeInstanceOf(CategoryDto);
  });

  it('should handle missing authors and categories', () => {
    const mockBookWithoutAuthorsAndCategories: IBook = {
      BookID: '12345',
      Title: 'Sample Book Title',
      ISBN: '978-3-16-148410-0',
      AuthorBook: 'Author_001',
      CategoryBook: 'Category_001',
      authors: [],
      categories: []
    };

    const bookDto = new BookDto(mockBookWithoutAuthorsAndCategories);

    expect(bookDto.authors).toEqual([]);
    expect(bookDto.categories).toEqual([]);
  });
});
