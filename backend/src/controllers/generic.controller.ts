import { Request, Response, NextFunction } from 'express';
import { GenericService } from '../services/generic.service';
import { Model } from 'sequelize';

export class GenericController<T extends Model> {
  private service: GenericService<T>;

  constructor(service: GenericService<T>) {
    this.service = service;
  }

  public findMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.service.findAll();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json(item);
    } catch (error) {
      next(error); 
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.create(req.body);
      res.status(201).json(item); 
    } catch (error) {
      next(error); 
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.update(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json(item);  
    } catch (error) {
      next(error); 
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await this.service.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted successfully' }); 
    } catch (error) {
      next(error); 
    }
  };
}
