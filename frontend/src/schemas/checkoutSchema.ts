// schemas/checkoutSchema.ts
import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(4, 'Nome deve ter pelo menos 4 letras'),
  email: z.string().email('E-mail inválido'),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;
