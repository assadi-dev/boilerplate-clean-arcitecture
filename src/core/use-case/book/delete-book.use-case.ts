
import { container } from "tsyringe";
import { BookRepository } from "../../interfaces/book.interfaces";
import Logger from "../../port/logger/logger.port";

export default class DeleteOneBookUseCase {

    private logger: Logger
    private bookRepository: BookRepository

    constructor() {
      this.logger = container.resolve<Logger>('Logger')
      this.bookRepository = container.resolve<BookRepository>('BookRepository')
    }


    async execute(id: string|number): Promise<void | 'Book not found'>{  
        this.logger.debug(`[delete-book use-case] start`)
        const delete_result = await this.bookRepository.delete(id)
        if(!delete_result) return 'Book not found'
   

     }
}