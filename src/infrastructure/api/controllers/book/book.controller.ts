import { Body, Controller, Delete, Get, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { GetBookOutputDto, GetBooksOutputDto, PostBookInputDto, PostBookOutputDto } from "./dto";
import { createBookCodec, getBookCodec } from "./dto/book.codec";
import StoreBookUseCase from "../../../../core/use-case/book/store-book.use-case";
import DeleteOneBookUseCase from "../../../../core/use-case/book/delete-book.use-case";
import GetBookByIdUseCase from "../../../../core/use-case/book/get-book-id.use-case";
import ListBooksUseCase from "../../../../core/use-case/book/list-books.use-case";


interface ZodValidationError {
    message: string
    code: string
    minimum?: number
    type: string,
    inclusive: boolean,
    exact: boolean,
    path: string[]
}

interface ValidateErrorJSON {
    message:string
    details:ZodValidationError[]
  }

@Route("book")
@Tags("Books")
export class BookController extends Controller{
    constructor() {
        super()
    }

    @Get()
    @SuccessResponse(200)
    async list(): Promise<GetBooksOutputDto>{
        return new ListBooksUseCase().execute()
    }

    @Get('{id}')
    @SuccessResponse(200)
    async getById(
        @Path() id: string
    ): Promise<GetBookOutputDto>{
        const bookId = getBookCodec.decodeBookId(id)
        if (!bookId.success) {
            throw  'Invalid book id'
        }
        const book = await new GetBookByIdUseCase().execute(bookId.data)
        if (typeof book === 'string') throw book
        return book
    }
    

    @Post()
    @SuccessResponse(201)
    @Response<ValidateErrorJSON>(422)
    async store(
        @Body() requestBody: PostBookInputDto,
    ): Promise<PostBookOutputDto>{


        const decodingResult = createBookCodec.decode(requestBody)
        if (!decodingResult.success) {
            throw decodingResult.error
            
        }

      return await new StoreBookUseCase().execute(decodingResult.data)
     

    
    }
    @Delete('{id}')
    @SuccessResponse(204)
    async delete(
        @Path() id: string,
    ): Promise<void>{
        const bookId = getBookCodec.decodeBookId(id)
        if (!bookId.success) {
            throw  'Invalid book id'
        }

        const delete_result = await new DeleteOneBookUseCase().execute(bookId.data)
        if (typeof delete_result === 'string') throw delete_result

        return;
    }
}