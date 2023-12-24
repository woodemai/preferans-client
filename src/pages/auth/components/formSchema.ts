import * as z from 'zod';

export const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})