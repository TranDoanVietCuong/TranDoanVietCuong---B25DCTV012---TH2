import { MOCK_API_URL } from "../config";
import type { Book, NewBook } from "../types/book";

function ensureConfigured(): void {
  if (MOCK_API_URL.includes("YOUR-MOCKAPI-URL")) {
    throw new Error(
      "Chưa cấu hình MockAPI. Hãy dán URL resource books vào src/config.ts."
    );
  }
}

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: ${response.statusText || "Request failed"}`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function getBooks(): Promise<Book[]> {
  ensureConfigured();
  return request<Book[]>(MOCK_API_URL);
}

export async function createBook(book: NewBook): Promise<Book> {
  ensureConfigured();

  return request<Book>(MOCK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
  });
}

export async function deleteBook(id: string): Promise<void> {
  ensureConfigured();

  await request<void>(
    `${MOCK_API_URL}/${encodeURIComponent(id)}`,
    {
      method: "DELETE"
    }
  );
}
