import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validationMiddleware = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };
};

export default validationMiddleware;
