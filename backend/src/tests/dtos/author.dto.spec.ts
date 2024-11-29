import { AuthorDto } from "../../common/dtos/author.dto";
import { BookDto } from "../../common/dtos/book.dto";
import { IAuthor } from "../../interfaces/author.interface";
import { IBook } from "../../interfaces/book.interface";

describe('AuthorDto', () => {
  it('should correctly map author data to AuthorDto when books are provided', () => {
    const bookData: IBook = {
      BookID: 'b1',
      Title: 'Sample Book',
      ISBN: '123-456-789',
      AuthorBook: 'author-1',
      CategoryBook: 'category-1',
      authors: [],
      categories: [] 
    };

    const authorData: IAuthor = {
      AuthorID: 'a1',
      FullName: 'John Doe',
      Bio: 'Famous author',
      books: [bookData]
    };

    const authorDto = new AuthorDto(authorData);

    expect(authorDto.AuthorID).toBe(authorData.AuthorID);
    expect(authorDto.FullName).toBe(authorData.FullName);
    expect(authorDto.Bio).toBe(authorData.Bio);
    expect(authorDto.books.length).toBe(1);
    expect(authorDto.books[0] instanceof BookDto).toBe(true); 
    expect(authorDto.books[0].BookID).toBe(bookData.BookID); 
  });

  it('should correctly map author data to AuthorDto when books is empty', () => {
    const authorData: IAuthor = {
      AuthorID: 'a1',
      FullName: 'John Doe',
      Bio: 'Famous author',
      books: [] 
    };

    const authorDto = new AuthorDto(authorData);

    expect(authorDto.AuthorID).toBe(authorData.AuthorID);
    expect(authorDto.FullName).toBe(authorData.FullName);
    expect(authorDto.Bio).toBe(authorData.Bio);
    expect(authorDto.books.length).toBe(0);
  });

  it('should handle missing optional properties in AuthorDto', () => {
    const authorData: IAuthor = {
      AuthorID: 'a1',
      FullName: 'John Doe',
    };

    const authorDto = new AuthorDto(authorData);

    expect(authorDto.AuthorID).toBe(authorData.AuthorID);
    expect(authorDto.FullName).toBe(authorData.FullName);
    expect(authorDto.Bio).toBeUndefined();
    expect(authorDto.books.length).toBe(0);
  });
});
