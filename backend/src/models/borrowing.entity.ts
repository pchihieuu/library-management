import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.entity";
import { Book } from "./book.entity";


@Table({
  tableName: "Borrowings",
  paranoid: true,
})
export class Borrowing extends Model {
  @Column({
    type: DataType.UUID, 
    primaryKey: true,
    defaultValue: DataType.UUIDV4, 
  })
  BorrowingID!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID, 
  })
  UserID!: string;
  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'deletedAt',
  })
  deletedAt?: Date;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.UUID, 
  })
  BookID!: string;

  @Column(DataType.DATE)
  BorrowDate!: Date;

  @Column(DataType.DATE)
  DueDate!: Date;

  @Column(DataType.DATE)
  ReturnDate?: Date;

  @Column(DataType.BOOLEAN)
  Renewed!: boolean;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Book)
  book!: Book;
}
