import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    Email: z.string().email({ message: 'Invalid email address!' }),
    FullName: z.string().min(1, { message: 'Full name is required!' }),
    Role: z.enum(['Admin', 'Member', 'Guest'], {
      errorMap: () => ({ message: "Role must be 'Admin', 'Member' or 'Guest'!" }),
    }),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      Email: z.string().email({ message: 'Invalid email address!' }).optional(),
      FullName: z.string().min(1, { message: 'Full name is required!' }).optional(),
      Role: z
        .enum(['Admin', 'Member', 'Guest'], {
          errorMap: () => ({ message: "Role must be 'Admin', 'Member' or 'Guest'!" }),
        })
        .optional(),
    })
    .partial(),
});
