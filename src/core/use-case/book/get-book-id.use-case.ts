import { container } from "tsyringe";
import { Book, BookRepository } from "../../interfaces/book.interfaces";
import Logger from "../../port/logger/logger.port";

export default class GetBookByIdUseCase {

    private logger: Logger
    private bookRepository: BookRepository

    constructor() {
        this.logger = container.resolve<Logger>('Logger')
        this.bookRepository = container.resolve<BookRepository>('BookRepository')
    }


    async execute(id: string|number): Promise<Book | 'Book not found'>{  
        this.logger.debug(`[Get-book use-case] start`)
        const book = await this.bookRepository.findById(id)
       return book ?? 'Book not found'

     }
}