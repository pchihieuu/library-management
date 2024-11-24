import { Column, DataType, Model, Table, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Book } from './book.entity';
import { BooksAuthors } from './booksauthor.entity';

@Table({
  tableName: 'Authors',
  paranoid: true,
})
export class Author extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  AuthorID!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  FullName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  Bio?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'deletedAt',
  })
  deletedAt?: Date;

  @BelongsToMany(() => Book, () => BooksAuthors)
  books!: Book[];
}
