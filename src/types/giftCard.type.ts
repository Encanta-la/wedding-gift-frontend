import { z } from 'zod';

const gitCardSchema = z
  .object({
    color: z.string(),
    createdAt: z.string(),
    description: z.string(),
    giftBuyerId: z.string().nullable(),
    giftBuyerMessage: z.string().nullable(),
    id: z.string(),
    name: z.string(),
    photoUrl: z.string(),
    price: z.number(),
    updatedAt: z.string(),
    voltage: z.number(),
  })
  .required();

export type GiftCardDto = z.infer<typeof gitCardSchema>;
