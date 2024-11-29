import { Model, ModelStatic } from 'sequelize';
import { GenericService } from '../../services/generic.service';



class MockModel extends Model {
  name!: string; // Thêm thuộc tính mẫu để tránh lỗi
}

const mockModelStatic: Partial<ModelStatic<MockModel>> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
};

describe('GenericService', () => {
  let service: GenericService<MockModel>;

  beforeEach(() => {
    service = new GenericService(mockModelStatic as ModelStatic<MockModel>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new entity', async () => {
    const mockData = { name: 'Test Entity' };
    const mockEntity = { id: 1, ...mockData };

    (mockModelStatic.create as jest.Mock).mockResolvedValue(mockEntity);

    const result = await service.create(mockData);

    expect(mockModelStatic.create).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockEntity);
  });

  it('should retrieve all entities', async () => {
    const mockEntities = [{ id: 1, name: 'Entity 1' }, { id: 2, name: 'Entity 2' }];

    (mockModelStatic.findAll as jest.Mock).mockResolvedValue(mockEntities);

    const result = await service.findAll();

    expect(mockModelStatic.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockEntities);
  });

  it('should find an entity by ID', async () => {
    const mockEntity = { id: 1, name: 'Entity 1' };

    (mockModelStatic.findByPk as jest.Mock).mockResolvedValue(mockEntity);

    const result = await service.findById(1);

    expect(mockModelStatic.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockEntity);
  });

  it('should update an entity by ID', async () => {
    const mockEntity = { id: 1, name: 'Entity 1', update: jest.fn() };

    (mockModelStatic.findByPk as jest.Mock).mockResolvedValue(mockEntity);

    const updatedData = { name: 'Updated Name' };

    const result = await service.update(1, updatedData);

    expect(mockModelStatic.findByPk).toHaveBeenCalledWith(1);
    expect(mockEntity.update).toHaveBeenCalledWith(updatedData);
    expect(result).toEqual(mockEntity);
  });

  it('should return null when updating a non-existent entity', async () => {
    (mockModelStatic.findByPk as jest.Mock).mockResolvedValue(null);

    const result = await service.update(999, { name: 'Updated Name' });

    expect(result).toBeNull();
  });

  it('should delete an entity by ID', async () => {
    const mockEntity = { id: 1, name: 'Entity 1', destroy: jest.fn() };

    (mockModelStatic.findByPk as jest.Mock).mockResolvedValue(mockEntity);

    const result = await service.delete(1);

    expect(mockModelStatic.findByPk).toHaveBeenCalledWith(1);
    expect(mockEntity.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should return false when deleting a non-existent entity', async () => {
    (mockModelStatic.findByPk as jest.Mock).mockResolvedValue(null);

    const result = await service.delete(999);

    expect(result).toBe(false);
  });
});
