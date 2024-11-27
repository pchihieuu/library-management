// Mocked model
import { GenericService } from '../../services/generic.service';
import { GenericController } from '../../controllers/generic.controller';
import { Request, Response, NextFunction } from 'express';
import { MockModel } from '../mocks/mock.model';

jest.mock('../../services/generic.service');

describe('GenericController', () => {
  let mockService: jest.Mocked<GenericService<any>>;
  let controller: GenericController<any>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockService = new GenericService(MockModel as any) as jest.Mocked<GenericService<any>>;
    controller = new GenericController(mockService);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it('should call findMany and return items', async () => {
    const mockItems = [{ id: 1, name: 'Test Item' }];
    mockService.findAll.mockResolvedValue(mockItems);

    await controller.findMany(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    expect(mockService.findAll).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockItems);
  });

  it('should call create and return the created item', async () => {
    const newItem = { id: 1, name: 'New Item' };
    mockRequest.body = newItem;
    mockService.create.mockResolvedValue(newItem);

    await controller.create(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    expect(mockService.create).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(newItem);
  });

  // More test cases...
});
