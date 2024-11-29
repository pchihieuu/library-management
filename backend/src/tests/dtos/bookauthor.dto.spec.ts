
import { BooksAuthorsDto } from '../../common/dtos/bookauthor.dto';
import { IBooksAuthors } from '../../interfaces/bookauthor.interface';
import { validate } from 'class-validator';

describe('BooksAuthorsDto', () => {

  it('should create a valid BooksAuthorsDto object', () => {
    const mockData: IBooksAuthors = {
      BookID: '12345',
      AuthorID: '67890'
    };

    const booksAuthorsDto = new BooksAuthorsDto(mockData);

    expect(booksAuthorsDto.BookID).toBe(mockData.BookID);
    expect(booksAuthorsDto.AuthorID).toBe(mockData.AuthorID);
  });

  it('should validate BookID and AuthorID as UUIDs', async () => {
    const invalidData: IBooksAuthors = {
      BookID: 'invalid-id',
      AuthorID: '67890'
    };

    const booksAuthorsDto = new BooksAuthorsDto(invalidData);
    const errors = await validate(booksAuthorsDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('BookID');  
  });

  it('should not fail when BookID and AuthorID are valid UUIDs', async () => {
    const validData: IBooksAuthors = {
      BookID: '123e4567-e89b-12d3-a456-426614174000',  
      AuthorID: '123e4567-e89b-12d3-a456-426614174001' 
    };

    const booksAuthorsDto = new BooksAuthorsDto(validData);
    const errors = await validate(booksAuthorsDto);

    expect(errors.length).toBe(0);  
  });

  it('should throw error if any required property is missing', async () => {
    const invalidData: IBooksAuthors = {
      BookID: '', 
      AuthorID: '67890'
    };

    const booksAuthorsDto = new BooksAuthorsDto(invalidData);
    const errors = await validate(booksAuthorsDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('BookID'); 
  });
});
