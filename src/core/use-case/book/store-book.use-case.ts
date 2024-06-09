
import { container } from "tsyringe";
import { Book, BookRepository, CreateBookInput } from "../../interfaces/book.interfaces";
import Logger from "../../port/logger/logger.port";

export default class StoreBookUseCase {

    private logger: Logger
    private bookRepository: BookRepository

    constructor() {
        this.logger =  container.resolve<Logger>('Logger')
        this.bookRepository = container.resolve<BookRepository>('BookRepository')
    }


    async execute(args: CreateBookInput): Promise<Book>{  
        this.logger.info(`[store-book use-case] start`)
        const book = await this.bookRepository.save(args)
        return  book
  

     }
}