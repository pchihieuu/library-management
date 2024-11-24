import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Book } from './book.entity';
import { BooksCategories } from './bookscategory.entity';

@Table({
  tableName: 'Categories',
  paranoid: true,
})
export class Category extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  CategoryID!: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  CategoryName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Description?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'deletedAt',
  })
  deletedAt?: Date;

  @BelongsToMany(() => Book, () => BooksCategories)
  books!: Book[];
}
