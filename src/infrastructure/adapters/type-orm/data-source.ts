import { z } from "zod"
import nodeTypeSafeConfig from "./typeOrm.config"
import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import Book from "./book/book.entity"

const ConfigSchema = z.object({
    host: z.string().min(1),
    port: z.coerce.number().min(1),
    user: z.string().min(1),
    password:z.string().min(1),
    database: z.string().min(1),

})

const config = ConfigSchema.parse(nodeTypeSafeConfig)

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: config.host,
    port: config.port,
    username: config.user,
    password: config.password,  
    database: config.database,
    entities: ["src/infrastructure/adapters/type-orm/**/*.entity.ts"],
    synchronize: true,
    //logging:true,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ["src/infrastructure/adapters/type-orm/migrations/**/*.ts"],
    migrationsTableName: "custom_migration_table",
    migrationsRun: true,
    extra: {
        charset: 'utf8mb4_unicode_ci',
    }, 
})


export const isInitialized = async (): Promise<boolean> => {

    
    if (AppDataSource.isInitialized) return Promise.resolve(true);
    return AppDataSource.initialize().then(()=>Promise.resolve(true)).catch(()=>Promise.resolve(false))
}

