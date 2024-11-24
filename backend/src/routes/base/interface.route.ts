import { Router } from 'express';

interface IRouter {
  routes(): void;

  getRoutes?(): Router;
}

export default IRouter;
