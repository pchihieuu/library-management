import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errorDetails = err.errors.map(issue => ({
        path: issue.path,
        message: issue.message,
      }));
    }

    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'Something went wrong!',
    });
  }
};

export default validate;
