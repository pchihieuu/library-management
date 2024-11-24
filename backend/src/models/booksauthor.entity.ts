import { Model, Table, ForeignKey, Column, DataType } from 'sequelize-typescript';
import { Book } from './book.entity';
import { Author } from './author.entity';

@Table({
  tableName: 'Books_Authors',
})
export class BooksAuthors extends Model {
  @ForeignKey(() => Book)
  BookID!: string;

  @ForeignKey(() => Author)
  AuthorID!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'deletedAt',
  })
  deletedAt?: Date;
}
