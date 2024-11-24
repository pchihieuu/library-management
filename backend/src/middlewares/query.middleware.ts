import { Request, Response, NextFunction } from 'express';

const queryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = (req.query[key] as string).trim();
      }
    });
  }
  next();
};

export default queryMiddleware;
