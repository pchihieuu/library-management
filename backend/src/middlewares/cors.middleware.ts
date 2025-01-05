import { Request, Response, NextFunction } from 'express';

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigin = process.env.GATEWAY_HOST || 'http://localhost:3001';  // Default to localhost if undefined
  const origin = req.headers.origin;

  // Set CORS headers based on origin
  if (origin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  // Allow methods and headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
};

export default corsMiddleware;
