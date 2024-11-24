import { Model, ModelStatic, FindOptions, Op, WhereOptions } from 'sequelize';

export class GenericService<T extends Model> {
  private model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async create(data: T['_creationAttributes']): Promise<T> {
    try {
      const entity = await this.model.create(data);
      return entity;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    try {
      const entities = await this.model.findAll(options);
      return entities;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }

  async findById(id: string | number): Promise<T | null> {
    try {
      const entity = await this.model.findByPk(id);
      return entity;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }

  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    try {
      const entity = await this.model.findByPk(id);
      if (!entity) {
        return null;
      }
      await entity.update(data);
      return entity;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }

  async delete(id: string | number): Promise<boolean> {
    try {
      const entity = await this.model.findByPk(id);
      if (!entity) {
        return false;
      }
      await entity.destroy();
      return true;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
}
