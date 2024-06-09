

export interface Book {
    id: number|string; 
    title: string;
    author: string;
    summary: string;
    totalPages: number;
    description: string;
}

export type CreateBookInput = Omit<Book,"id"> 

export interface BookRepository {
    save(args:CreateBookInput ):Promise<Book>
    findById(id: string|number): Promise<Book | null> 
    findAll(): Promise<Book[]> 
    delete(id:string|number):Promise<boolean>

}
