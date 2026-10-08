import http from "node:http";
import {
  readFile,
  writeFile
} from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const DATA_FILE =
  path.join(
    __dirname,
    "data",
    "books.json"
  );

const PORT = 3001;

async function readBooks() {
  const text =
    await readFile(
      DATA_FILE,
      "utf8"
    );

  return JSON.parse(text);
}

async function saveBooks(books) {
  await writeFile(
    DATA_FILE,
    JSON.stringify(
      books,
      null,
      2
    ),
    "utf8"
  );
}

function sendJson(
  response,
  statusCode,
  data
) {
  response.writeHead(
    statusCode,
    {
      "Content-Type":
        "application/json; charset=utf-8"
    }
  );

  response.end(
    JSON.stringify(data)
  );
}

async function readJsonBody(request) {
  const chunks = [];

  for await (
    const chunk of request
  ) {
    chunks.push(chunk);
  }

  const text =
    Buffer.concat(chunks)
      .toString("utf8");

  return text
    ? JSON.parse(text)
    : {};
}

function validateBook(book) {
  const currentYear =
    new Date().getFullYear();

  if (!book.code?.trim()) {
    return "Mã sách là bắt buộc.";
  }

  if (
    !book.title?.trim() ||
    book.title.trim().length < 3
  ) {
    return "Tên sách phải có ít nhất 3 ký tự.";
  }

  if (!book.author?.trim()) {
    return "Tác giả là bắt buộc.";
  }

  if (!book.genre?.trim()) {
    return "Thể loại là bắt buộc.";
  }

  const year =
    Number(book.year);

  if (
    !Number.isInteger(year) ||
    year < 1900 ||
    year > currentYear
  ) {
    return `Năm phải từ 1900 đến ${currentYear}.`;
  }

  return "";
}

const server =
  http.createServer(
    async (request, response) => {
      try {
        const url =
          new URL(
            request.url,
            `http://${request.headers.host}`
          );

        if (
          request.method === "GET" &&
          url.pathname === "/api/books"
        ) {
          const books =
            await readBooks();

          return sendJson(
            response,
            200,
            books
          );
        }

        if (
          request.method === "POST" &&
          url.pathname === "/api/books"
        ) {
          const newBook =
            await readJsonBody(request);

          const validationMessage =
            validateBook(newBook);

          if (validationMessage) {
            return sendJson(
              response,
              400,
              {
                message:
                  validationMessage
              }
            );
          }

          const books =
            await readBooks();

          const duplicated =
            books.some(
              (book) =>
                String(book.code)
                  .trim()
                  .toLocaleLowerCase("vi") ===
                String(newBook.code)
                  .trim()
                  .toLocaleLowerCase("vi")
            );

          if (duplicated) {
            return sendJson(
              response,
              409,
              {
                message:
                  "Mã sách đã tồn tại."
              }
            );
          }

          const created = {
            id: randomUUID(),
            code:
              newBook.code.trim(),
            title:
              newBook.title.trim(),
            author:
              newBook.author.trim(),
            genre:
              newBook.genre.trim(),
            year:
              Number(newBook.year)
          };

          books.unshift(created);
          await saveBooks(books);

          return sendJson(
            response,
            201,
            created
          );
        }

        const deleteMatch =
          url.pathname.match(
            /^\/api\/books\/([^/]+)$/
          );

        if (
          request.method === "DELETE" &&
          deleteMatch
        ) {
          const id =
            decodeURIComponent(
              deleteMatch[1]
            );

          const books =
            await readBooks();

          const exists =
            books.some(
              (book) =>
                String(book.id) ===
                String(id)
            );

          if (!exists) {
            return sendJson(
              response,
              404,
              {
                message:
                  "Không tìm thấy sách."
              }
            );
          }

          const nextBooks =
            books.filter(
              (book) =>
                String(book.id) !==
                String(id)
            );

          await saveBooks(nextBooks);

          response.writeHead(204);
          return response.end();
        }

        return sendJson(
          response,
          404,
          {
            message:
              "Không tìm thấy API."
          }
        );
      } catch (error) {
        console.error(error);

        return sendJson(
          response,
          500,
          {
            message:
              "Lỗi máy chủ nội bộ."
          }
        );
      }
    }
  );

server.listen(
  PORT,
  () => {
    console.log(
      `API đang chạy tại http://localhost:${PORT}`
    );
  }
);
