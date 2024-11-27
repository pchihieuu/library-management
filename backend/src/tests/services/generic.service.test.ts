import { GenericService } from '../../services/generic.service';
import { Model, ModelStatic } from 'sequelize';

class MockModel extends Model {
  public id!: number;
  public name!: string;
}

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
    const mockEntities = [
      Object.assign(new MockModel(), { id: 1, name: 'Test 1', dataValues: { id: 1, name: 'Test 1' } }),
      Object.assign(new MockModel(), { id: 2, name: 'Test 2', dataValues: { id: 2, name: 'Test 2' } }),
    ];

    mockModel.findAll.mockResolvedValue(mockEntities);

    const result = await service.findAll();

    expect(result).toEqual(mockEntities);
    expect(mockModel.findAll).toHaveBeenCalled();

    mockModel.findAll.mockImplementation(() => {
        return Promise.resolve([
          Object.assign(new MockModel(), { id: 1, name: 'Test 1', dataValues: { id: 1, name: 'Test 1' } }),
          Object.assign(new MockModel(), { id: 2, name: 'Test 2', dataValues: { id: 2, name: 'Test 2' } }),
        ]);
      });
      
  });
});
