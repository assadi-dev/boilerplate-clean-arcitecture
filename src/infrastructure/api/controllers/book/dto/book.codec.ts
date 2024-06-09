import { BookIdDto } from "./get-book.dto";
import { PostBookInputDto } from "./post-book.dto";

export const getBookCodec = {
    decodeBookId: (params: unknown) => BookIdDto.safeParse(params),
    
}
export const createBookCodec = {
    decode: (params: unknown) => PostBookInputDto.safeParse(params),
    
}