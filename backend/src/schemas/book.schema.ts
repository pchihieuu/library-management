import { z } from 'zod';

export const createBookSchema = z.object({
  body: z.object({
    Title: z.string().min(1, { message: 'Title must be greater than 1 characters!' }),
    PublicationYear: z.number().min(100, { message: 'PublicationYear must be greater than' }),
    ISBN: z.string().min(1, { message: 'ISBN must be provided!' }),
    TotalCopies: z.number().int().min(0, { message: 'Total copies must be at least 0!' }),
    AvailableCopies: z.number().int().min(0, { message: 'Available copies must be at least 0!' }),
    Status: z.enum(['available', 'borrowed', 'reserved'], {
      errorMap: () => ({ message: "Status must be one of 'available', 'borrowed', or 'reserved'!" }),
    }),
    AuthorBook: z.string().min(1, { message: 'Author is required!' }),
    CategoryBook: z.string().min(1, { message: 'Category is required!' }),
    Description: z.string().optional(),
  }),
});

export const updateBookSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      Title: z.string().min(1, { message: 'Title must be greater than 1 characters!' }).optional(),
      PublicationYear: z.number().min(100, { message: 'PublicationYear must be greater than' }).optional(),
      ISBN: z.string().min(1, { message: 'ISBN must be provided!' }).optional(),
      TotalCopies: z.number().int().min(0, { message: 'Total copies must be at least 0!' }).optional(),
      AvailableCopies: z.number().int().min(0, { message: 'Available copies must be at least 0!' }).optional(),
      Status: z
        .enum(['available', 'borrowed', 'reserved'], {
          errorMap: () => ({ message: "Status must be one of 'available', 'borrowed', or 'reserved'!" }),
        })
        .optional(),
      AuthorBook: z.string().min(1, { message: 'Author is required!' }).optional(),
      CategoryBook: z.string().min(1, { message: 'Category is required!' }).optional(),
      Description: z.string().optional(),
    })
    .partial(),
});
