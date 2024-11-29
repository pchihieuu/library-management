import { UserDto } from "../../common/dtos/user.dto";
import { IUser } from "../../interfaces/user.interface";
import { validate } from "class-validator";

describe('UserDto', () => {
  it('should correctly map valid user data', () => {
    const validUserData: IUser = {
      UserID: 'dcbf3b4c-bdd2-477f-a5ab-e6b5b11f3f8d',
      FullName: 'John Doe',
      Email: 'johndoe@example.com',
      Role: 'Admin'
    };

    const userDto = new UserDto(validUserData);

    expect(userDto.UserID).toBe(validUserData.UserID);
    expect(userDto.FullName).toBe(validUserData.FullName);
    expect(userDto.Email).toBe(validUserData.Email);
    expect(userDto.Role).toBe(validUserData.Role);
  });

  it('should reject invalid UUID for UserID', async () => {
    const invalidUserData: IUser = {
      UserID: 'invalid-uuid',
      FullName: 'John Doe',
      Email: 'johndoe@example.com',
      Role: 'Admin'
    };

    const userDto = new UserDto(invalidUserData);
    
    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('UserID');
  });

  it('should reject invalid email format', async () => {
    const invalidEmailData: IUser = {
      UserID: 'dcbf3b4c-bdd2-477f-a5ab-e6b5b11f3f8d',
      FullName: 'John Doe',
      Email: 'invalid-email',
      Role: 'Admin'
    };

    const userDto = new UserDto(invalidEmailData);
    
    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0); 
    expect(errors[0].property).toBe('Email');
    expect(errors[0].constraints?.isEmail).toBe('Email must be an email');
  });

  it('should reject invalid role', async () => {
    const invalidRoleData: IUser = {
      UserID: 'dcbf3b4c-bdd2-477f-a5ab-e6b5b11f3f8d',
      FullName: 'John Doe',
      Email: 'johndoe@example.com',
      Role: 'InvalidRole' 
    };

    const userDto = new UserDto(invalidRoleData);
    
    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);  
    expect(errors[0].property).toBe('Role');
    expect(errors[0].constraints?.isIn).toBe('Role must be one of the following values: Admin, Guest, Member');
  });

  it('should accept valid optional fields', () => {
    const userDataWithOptionalField: IUser = {
      UserID: 'dcbf3b4c-bdd2-477f-a5ab-e6b5b11f3f8d',
      FullName: 'John Doe',
      Email: 'johndoe@example.com',
      Role: 'Member',
    };

    const userDto = new UserDto(userDataWithOptionalField);

    expect(userDto.UserID).toBe(userDataWithOptionalField.UserID);
    expect(userDto.FullName).toBe(userDataWithOptionalField.FullName);
    expect(userDto.Email).toBe(userDataWithOptionalField.Email);
    expect(userDto.Role).toBe(userDataWithOptionalField.Role);
  });

  it('should handle missing optional fields gracefully', () => {
    const userDataWithoutOptionalField: IUser = {
      UserID: 'dcbf3b4c-bdd2-477f-a5ab-e6b5b11f3f8d',
      FullName: 'John Doe',
      Email: 'johndoe@example.com',
      Role: 'Member',
    };

    const userDto = new UserDto(userDataWithoutOptionalField);

    expect(userDto.deletedAt).toBeUndefined(); 
  });
});
