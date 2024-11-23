import { IsString, IsUUID, IsOptional, IsEmail, IsIn, IsArray, IsDate } from 'class-validator';

import { IUser } from '../../interfaces/user.interface';

export class UserDto implements IUser {
  @IsUUID()
  public UserID: string;

  @IsString()
  public FullName: string;

  @IsEmail()
  public Email: string;

  @IsString()
  @IsIn(["Admin", "Guest", "Member"])
  public Role: string;

  @IsOptional()
  @IsDate()
  public deletedAt?: Date;

  constructor(user: IUser) {
    this.UserID = user.UserID;
    this.FullName = user.FullName;
    this.Email = user.Email;
    this.Role = user.Role;
    // this.borrowings = user.borrowings?.map((borrowing) => new BorrowingDto(borrowing));
  }
}
