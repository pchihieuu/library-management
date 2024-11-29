import { Book } from "../../models/book.entity";
import { BookService } from "../../services/book.service";

// Mocking the Book model to mock the `findAll` method
jest.mock('../../models/book.entity', () => ({
  Book: {
    findAll: jest.fn(),
  },
}));

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    service = new BookService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find books by title', async () => {
    const mockBooks = [
      { id: '7b44bb63-5920-4934-99e6-bed4d87b0581', Title: 'Ký Sự Người Nuôi Chó' },
      { id: 'dda5d781-88c0-4ab3-8199-b797bf85316e', Title: 'Hương sắc trong vườn văn' }
    ];

    // Mock the `findAll` method of Book model
    (Book.findAll as jest.Mock).mockResolvedValue(mockBooks);

    // Call the service method
    const result = await service.findByTitle('Ký Sự Người Nuôi Chó');

    // Assert the correct query and result
    expect(Book.findAll).toHaveBeenCalledWith({
      where: { Title: 'Ký Sự Người Nuôi Chó' },
    });
    expect(result).toEqual(mockBooks);
  });

  it('should throw an error when finding books by title fails', async () => {
    // Mock a failure in the `findAll` method
    (Book.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

    // Expect the service to throw a custom error
    await expect(service.findByTitle('Ký Sự Người Nuôi Chó')).rejects.toThrow(
      'Error while retrieving book by title: Database error'
    );
  });
});
