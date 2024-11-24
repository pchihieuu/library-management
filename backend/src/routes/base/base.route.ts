import { Router } from 'express';
import IRouter from './interface.route';

abstract class BaseRoutes implements IRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;

  public getRoutes(): Router {
    return this.router;
  }
}

export default BaseRoutes;
