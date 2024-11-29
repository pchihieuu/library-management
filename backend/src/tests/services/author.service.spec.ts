import { Author } from "../../models/author.entity";
import { AuthorService } from "../../services/author.service";

jest.mock('../../models/author.entity', () => ({
  Author: {
    findAll: jest.fn(),
  },
}));

describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(() => {
    service = new AuthorService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByName', () => {
    it('should return authors with the given name', async () => {
      const mockAuthors = [
        { AuthorID: '6a931a3-aff6-4e0a-9c01-e86a0fb234eb', FullName: 'Nguyễn Hiến Lê', 
            Bio: 'Ông là một tác giả, dịch giả, nhà ngôn ngữ học, nhà giáo dục và hoạt động văn hóa độc lập.' },
        { AuthorID: '8ec043b1-bb6d-4a24-9390-4e7cea79a692', FullName: 'Hoàng Hải Vân', 
            Bio: 'Ông là nhà thơ, nhà báo kỳ cựu, nguyên Tổng thư ký tòa soạn Báo Thanh Niên.' },
      ];

      (Author.findAll as jest.Mock).mockResolvedValue(mockAuthors);

      const result = await service.findByName('Nguyễn Hiến Lê');

      expect(Author.findAll).toHaveBeenCalledWith({
        where: {
          FullName: 'Nguyễn Hiến Lê',
        },
      });
      expect(result).toEqual(mockAuthors);
    });

    it('should return an empty array if no authors are found', async () => {
      (Author.findAll as jest.Mock).mockResolvedValue([]);

      const result = await service.findByName('Non-existent Author');

      expect(Author.findAll).toHaveBeenCalledWith({
        where: {
          FullName: 'Non-existent Author',
        },
      });
      expect(result).toEqual([]);
    });

    it('should throw an error when findAll fails', async () => {
      (Author.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(service.findByName('Nguyễn Hiến Lê')).rejects.toThrow(
        'Error while retrieving authors by name: Database error'
      );
      expect(Author.findAll).toHaveBeenCalledWith({
        where: {
          FullName: 'Nguyễn Hiến Lê',
        },
      });
    });
  });
});
