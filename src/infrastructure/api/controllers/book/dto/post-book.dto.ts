import { z } from "zod";
import { BookOutputDto } from "./book.dto";


export const PostBookInputDto = z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    summary: z.string().min(5),
    totalPages: z.number().min(1),
    description: z.string()
})
export type PostBookInputDto = ReturnType<typeof PostBookInputDto.parse>

export const PostBookOutputDto = BookOutputDto
export type PostBookOutputDto = ReturnType<typeof PostBookOutputDto.parse>