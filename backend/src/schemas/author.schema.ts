import { z } from 'zod';

export const createAuthorSchema = z.object({
  body: z.object({
    FullName: z.string().min(1, { message: 'Author name must be greater than 1 characters!' }),
    Bio: z.string().optional(),
  }),
});

export const updateAuthorSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      FullName: z.string().min(1, { message: 'Author name must be greater than 1 characters!' }).optional(),
      Bio: z.string().optional(),
    })
    .partial(),
});
