import { IsUUID, IsDate, IsOptional, IsBoolean } from "class-validator";

export class BorrowingDto {
  @IsUUID()
  public BorrowingID!: string;

  @IsUUID()
  public UserID!: string;

  @IsUUID()
  public BookID!: string;

  @IsDate()
  public BorrowDate!: Date;

  @IsDate()
  public DueDate!: Date;

  @IsOptional()
  @IsDate()
  public ReturnDate?: Date;

  @IsBoolean()
  public Renewed!: boolean;

  @IsOptional()
  @IsDate()
  public deletedAt?: Date;
}
