import { User } from "../../models/user.entity";
import { UserService } from "../../services/user.service";

// Mock the User model
jest.mock('../../models/user.entity', () => ({
  User: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls and instances after each test
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const mockUser = {
        UserID: '123e4567-e89b-12d3-a456-426614174000',
        FullName: 'John Doe',
        Email: 'john.doe@example.com',
        Role: 'Member',
      };
      (User.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.create({
        FullName: 'John Doe',
        Email: 'john.doe@example.com',
        Role: 'Member',
      });

      expect(User.create).toHaveBeenCalledWith({
        FullName: 'John Doe',
        Email: 'john.doe@example.com',
        Role: 'Member',
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if creation fails', async () => {
      (User.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(
        service.create({ FullName: 'Jane Doe', Email: 'jane.doe@example.com', Role: 'Admin' }),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const mockUsers = [
        {
          UserID: '8f6e2080-edd8-4360-8459-6b0126baac05',
          FullName: 'Phan Chi Hieu',
          Email: 'pchihieuu@gmail.com',
          Role: 'Admin',
        },
        {
          UserID: '53c1cb4d-8fc5-45b0-95d4-146df0d92cab',
          FullName: 'Nguyen Phat Dat',
          Email: 'phatdat@gmail.com',
          Role: 'Admin',
        },
      ];
      (User.findAll as jest.Mock).mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(User.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it('should throw an error if fetching users fails', async () => {
      (User.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(service.findAll()).rejects.toThrow('Database error');
    });
  });

  describe('findById', () => {
    it('should return a user if found', async () => {
      const mockUser = {
        UserID: '8f6e2080-edd8-4360-8459-6b0126baac05',
          FullName: 'Phan Chi Hieu',
          Email: 'pchihieuu@gmail.com',
          Role: 'Admin',
      };
      (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findById('8f6e2080-edd8-4360-8459-6b0126baac05');

      expect(User.findByPk).toHaveBeenCalledWith('8f6e2080-edd8-4360-8459-6b0126baac05');
      expect(result).toEqual(mockUser);
    });

    it('should return null if the user is not found', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await service.findById('123e4567-e89b-12d3-a456-426614174999');

      expect(User.findByPk).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174999');
      expect(result).toBeNull();
    });

    it('should throw an error if fetching user fails', async () => {
      (User.findByPk as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(service.findById('8f6e2080-edd8-4360-8459-6b0126baac05')).rejects.toThrow(
        'Database error',
      );
    });
  });

  describe('delete', () => {
    it('should delete a user and return true if found', async () => {
      const mockUser = {
        UserID: '123e4567-e89b-12d3-a456-426614174000',
        destroy: jest.fn(),
      };
      (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.delete('123e4567-e89b-12d3-a456-426614174000');

      expect(User.findByPk).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(mockUser.destroy).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should return false if the user is not found', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await service.delete('123e4567-e89b-12d3-a456-426614174999');

      expect(User.findByPk).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174999');
      expect(result).toBe(false);
    });

    it('should throw an error if deletion fails', async () => {
      (User.findByPk as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(
        service.delete('123e4567-e89b-12d3-a456-426614174000'),
      ).rejects.toThrow('Database error');
    });
  });
});
