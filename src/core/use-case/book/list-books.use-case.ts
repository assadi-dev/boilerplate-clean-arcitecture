import { container } from "tsyringe";
import Logger from "../../port/logger/logger.port";
import { Book, BookRepository } from "../../interfaces/book.interfaces";


export default class ListBooksUseCase {

    private logger: Logger
    private bookRepository: BookRepository

    constructor() {
        this.logger =  container.resolve<Logger>('Logger')
        this.bookRepository = container.resolve<BookRepository>('BookRepository')
    }

    async execute(): Promise<Book[]>{
        this.logger.info(`[list-book use-case] Start`)
        const books = await this.bookRepository.findAll()
        return books
    }
}