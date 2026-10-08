export interface Book {
  id: string;
  code: string;
  title: string;
  author: string;
  genre: string;
  year: number;
}

export type NewBook = Omit<Book, "id">;
