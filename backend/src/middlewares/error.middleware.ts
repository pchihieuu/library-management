import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${message}`);
  res.status(status).json({
    success: false,
    status,
    message,
  });
};

export default errorMiddleware;
