import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Borrowing } from "./borrowing.entity";


@Table({
  tableName: "Users",
  paranoid: true,
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  UserID!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  FullName!: string;

  @Column({
    type: DataType.STRING(100),
    unique: true,
    allowNull: false,
  })
  Email!: string;

  @Column({
    type: DataType.ENUM('Admin', 'Member', 'Guest'),
    allowNull: false,
  })
  Role!:  'Admin' | 'Member' | 'Guest';

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'deletedAt',
  })
  deletedAt?: Date;

  @HasMany(() => Borrowing)
  borrowings!: Borrowing[];

}
