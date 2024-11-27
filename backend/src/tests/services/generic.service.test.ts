import { GenericService } from '../../services/generic.service';
import { Model, ModelStatic } from 'sequelize';

// Mock Model with Sequelize attributes and methods
class MockModel extends Model {
  public id!: number;
  public name!: string;

}

// Initialize the mock model with necessary static methods
const mockModel: jest.Mocked<ModelStatic<MockModel>> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
} as any;

describe('GenericService', () => {
  let service: GenericService<MockModel>;

  beforeEach(() => {
    service = new GenericService(mockModel);
    jest.clearAllMocks();
  });

  test('should fetch all entities', async () => {
    // Mock the entities to return
    const mockEntities = [
      Object.assign(new MockModel(), { id: 1, name: 'Test 1' }),
      Object.assign(new MockModel(), { id: 2, name: 'Test 2' }),
    ];

    // Mock the behavior of findAll to return mockEntities
    mockModel.findAll.mockResolvedValue(mockEntities);

    // Execute the service method
    const result = await service.findAll();

    // Verify the result and ensure findAll was called
    expect(result).toEqual(mockEntities);
    expect(mockModel.findAll).toHaveBeenCalled();
  });
});
