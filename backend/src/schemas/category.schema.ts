import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    CategoryName: z.string().min(1, { message: 'Category name must be greater than 1 characters!' }),
    Description: z.string().optional(),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      CategoryName: z.string().min(1, { message: 'Category name must be greater than 1 characters!' }).optional(),
      Description: z.string().optional(),
    })
    .partial(),
});
