import { z } from "zod";

export const BookOutputDto = z.object({
    id: z.union([z.string(),z.number()]),
    title: z.string(),
    author: z.string(),
    summary: z.string(),
    totalPages: z.number(),
    description: z.string()
});

