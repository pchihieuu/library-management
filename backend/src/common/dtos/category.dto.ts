
import { IsString, IsUUID, IsOptional, IsArray } from 'class-validator';
import { ICategory } from '../../interfaces/category.interface';
import { BookDto } from './book.dto';  
export class CategoryDto implements ICategory {
  @IsUUID()
  public CategoryID: string;

  @IsString()
  public CategoryName: string;

  @IsOptional()  
  @IsString()
  public Description: string;

  @IsArray()
  public books: BookDto[]; 

  constructor(category: ICategory) {
    this.CategoryID = category.CategoryID;
    this.CategoryName = category.CategoryName;
    this.Description = category.Description || '';  
    this.books = category.books ? category.books.map((book) => new BookDto(book)) : []; 
  }
}
