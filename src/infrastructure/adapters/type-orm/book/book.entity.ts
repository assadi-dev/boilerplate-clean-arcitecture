import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Book as BookCoreEntity} from "../../../../core/interfaces/book.interfaces"

@Entity()
class Book {
    @PrimaryGeneratedColumn('increment')
    id: string
    @Column()
    title: string
    @Column()
    author: string
    @Column()
    summary: string
    @Column()
    totalPages: number
    @CreateDateColumn({
        type: 'timestamp',
        nullable:true,
   
    })
    @Column({nullable:true,type:"text"})
    description: string 
    createdAt: Date
    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    updatedAt: Date

    toDomainEntity(): BookCoreEntity{
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            summary: this.summary,
            totalPages: this.totalPages,
            description: this.description,
        }
    }

}

export default Book