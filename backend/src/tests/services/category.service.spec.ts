import { Category } from "../../models/category.entity";
import { CategoryService } from "../../services/category.service";


// Mock the Category model
jest.mock('../../models/category.entity', () => ({
  Category: {
    findOne: jest.fn(),
  },
}));

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    service = new CategoryService();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls and instances after each test
  });

  describe('findBySlug', () => {
    it('should return a category when it exists', async () => {
      const mockCategory = {
        CategoryID: '123e4567-e89b-12d3-a456-426614174000',
        CategoryName: 'Tech',
        Description: 'Technology-related books',
        slug: 'tech',
      };
      (Category.findOne as jest.Mock).mockResolvedValue(mockCategory);

      const result = await service.findBySlug('tech');

      expect(Category.findOne).toHaveBeenCalledWith({ where: { slug: 'tech' } });
      expect(result).toEqual(mockCategory);
    });

    it('should return null if the category does not exist', async () => {
      (Category.findOne as jest.Mock).mockResolvedValue(null);

      const result = await service.findBySlug('non-existent-slug');

      expect(Category.findOne).toHaveBeenCalledWith({ where: { slug: 'non-existent-slug' } });
      expect(result).toBeNull();
    });

    it('should throw an error if findOne fails', async () => {
      (Category.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(service.findBySlug('tech')).rejects.toThrow('Database error');
      expect(Category.findOne).toHaveBeenCalledWith({ where: { slug: 'tech' } });
    });
  });
});
