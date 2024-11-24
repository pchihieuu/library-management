import { Column, DataType, Model, Table, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Author } from './author.entity';
import { Category } from './category.entity';
import { BooksAuthors } from './booksauthor.entity';
import { BooksCategories } from './bookscategory.entity';
import { Borrowing } from './borrowing.entity';

@Table({
  tableName: 'Books',
  paranoid: true,
})
export class Book extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  BookID!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  Title!: string;

  @Column({
    type: DataType.INTEGER,
    validate: { min: 1900 },
  })
  PublicationYear?: number;

  @Column({
    type: DataType.STRING(20),
    unique: true,
    allowNull: false,
  })
  ISBN!: string;

  @Column(DataType.TEXT)
  Description?: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  TotalCopies!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  AvailableCopies!: number;

  @Column({
    type: DataType.ENUM('available', 'borrowed', 'reserved'),
    allowNull: false,
  })
  Status!: 'available' | 'borrowed' | 'reserved';

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  AuthorBook!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  CategoryBook!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'deletedAt',
  })
  deletedAt?: Date;

  @BelongsToMany(() => Author, () => BooksAuthors)
  authors!: Author[];

  @BelongsToMany(() => Category, () => BooksCategories)
  categories!: Category[];

  @HasMany(() => Borrowing)
  borrowings!: Borrowing[];
}
