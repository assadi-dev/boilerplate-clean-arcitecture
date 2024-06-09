import { Book, BookRepository, CreateBookInput } from "../../../../core/interfaces/book.interfaces";
import { AppDataSource, isInitialized } from "../data-source";
import  BookEntity  from "./book.entity";

export default class TypeOrmBookRepository implements BookRepository

{

    async findAll(): Promise<Book[]> {
        await isInitialized();
        const bookRepository = AppDataSource.getRepository(BookEntity);
        const books = await bookRepository.find();
      
        
       return  books?.map((bookEntity) => bookEntity.toDomainEntity())
    }

    async findById(id: string): Promise<Book | null> {
        await isInitialized();
        const bookRepository =  await AppDataSource.getRepository(BookEntity)
        const book = await bookRepository.findOne({ where: { id } });
        return book ? book.toDomainEntity() : null;
    }
    async save(args: CreateBookInput): Promise<Book> {
        await isInitialized();
        const bookRepository = await AppDataSource.getRepository(BookEntity)
        const insertBook= await bookRepository.insert({
            title: args.title,
            author: args.author,
            summary: args.summary,
            totalPages: args.totalPages,
            description:args.description
        })
        const bookIdentifier = insertBook.identifiers.at(0)
        if (!bookIdentifier) {
            throw 'Book creation failed in type-orm'
        }
       
        const bookCreated = await bookRepository.findOne({ where: { id: bookIdentifier.id } });
        if (!bookCreated) {
            throw 'Book creation no found in type-orm'
        }
        return bookCreated.toDomainEntity();
        
    }
    async delete(id: string | number): Promise<boolean> {
        await isInitialized();
        const bookRepository = await AppDataSource.getRepository(BookEntity);
        const deleteResult = await bookRepository.delete(id)
        return deleteResult.affected === 1
    }
}