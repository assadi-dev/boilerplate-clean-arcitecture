
import { container } from "tsyringe";
import winstonLoggerConfig from "./winston-logger/winston-logger.config";
import Logger from "../../core/port/logger/logger.port";
import { BookRepository } from "../../core/interfaces/book.interfaces";

import TypeOrmBookRepository from "./type-orm/book/book.repository";
import WinstonLogger, { LogLevel } from "./winston-logger/winston-logger.adapter";


container.register<Logger>('Logger', {
    
    useValue:new WinstonLogger(winstonLoggerConfig.logLevel as LogLevel)
})
    .register<BookRepository>('BookRepository', {
    useValue:new TypeOrmBookRepository()
})