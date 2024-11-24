import { Model, Table, ForeignKey, DataType, Column } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Book } from './book.entity';

@Table({
  tableName: 'Books_Categories',
  paranoid: true,
})
export class BooksCategories extends Model {
  @ForeignKey(() => Book)
  BookID!: string;

  @ForeignKey(() => Category)
  CategoryID!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'deletedAt',
  })
  deletedAt?: Date;
}
