import request from 'supertest';
import express from 'express';
import { corsMiddleware } from '../../middlewares';


const app = express();

// Apply the CORS middleware
app.use(corsMiddleware);

app.get('/test', (req, res) => {
  res.status(200).send('Hello, World!');
});

describe('CORS Middleware', () => {
  it('should set the correct CORS headers for a valid origin', async () => {
    const response = await request(app)
      .get('/test')
      .set('Origin', 'http://localhost:3000');  // Set the expected origin here

    console.log(response.headers);  // Log the response headers for debugging
    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(response.headers['access-control-allow-methods']).toBe('GET, POST, PATCH, DELETE, PUT');
    expect(response.headers['access-control-allow-headers']).toBe('Content-Type, Authorization');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });

  it('should allow any origin when the origin does not match the configured GATEWAY_HOST', async () => {
    const response = await request(app)
      .get('/test')
      .set('Origin', 'http://invalid-origin.com');

    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe('*');
    expect(response.headers['access-control-allow-methods']).toBe('GET, POST, PATCH, DELETE, PUT');
    expect(response.headers['access-control-allow-headers']).toBe('Content-Type, Authorization');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });

  it('should handle OPTIONS requests (preflight)', async () => {
    const response = await request(app)
      .options('/test')
      .set('Origin', 'http://localhost:3000');

    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(response.headers['access-control-allow-methods']).toBe('GET, POST, PATCH, DELETE, PUT');
    expect(response.headers['access-control-allow-headers']).toBe('Content-Type, Authorization');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });

  it('should reject requests from invalid origins (without credentials)', async () => {
    const response = await request(app)
      .get('/test')
      .set('Origin', 'http://invalid-origin.com');

    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe('*');
    expect(response.headers['access-control-allow-methods']).toBe('GET, POST, PATCH, DELETE, PUT');
    expect(response.headers['access-control-allow-headers']).toBe('Content-Type, Authorization');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });
});
