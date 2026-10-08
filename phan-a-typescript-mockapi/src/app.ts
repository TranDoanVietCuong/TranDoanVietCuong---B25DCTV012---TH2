import "./style.css";

import {
  createBook,
  deleteBook,
  getBooks
} from "./services/api";

import {
  getFavorites,
  getTheme,
  saveFavorites,
  saveTheme
} from "./services/storage";

import {
  clearAllErrors,
  validateAuthor,
  validateCode,
  validateGenre,
  validateTitle,
  validateYear
} from "./validation";

import {
  renderBooks,
  renderGenres
} from "./ui";

import type {
  Book,
  NewBook
} from "./types/book";

function qs<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Không tìm thấy phần tử: ${selector}`);
  }

  return element;
}

const bookList =
  qs<HTMLElement>("#book-list");

const searchInput =
  qs<HTMLInputElement>("#search-input");

const genreFilter =
  qs<HTMLSelectElement>("#genre-filter");

const statusElement =
  qs<HTMLElement>("#status");

const favoriteCount =
  qs<HTMLElement>("#favorite-count");

const themeButton =
  qs<HTMLButtonElement>("#theme-btn");

const form =
  qs<HTMLFormElement>("#book-form");

const submitButton =
  qs<HTMLButtonElement>("#submit-btn");

const formMessage =
  qs<HTMLElement>("#form-message");

const codeInput =
  qs<HTMLInputElement>("#code");

const titleInput =
  qs<HTMLInputElement>("#title");

const authorInput =
  qs<HTMLInputElement>("#author");

const genreInput =
  qs<HTMLSelectElement>("#genre");

const yearInput =
  qs<HTMLInputElement>("#year");

let books: Book[] = [];
let favorites: string[] =
  getFavorites();

function setStatus(
  message: string,
  isError = false
): void {
  statusElement.textContent = message;
  statusElement.classList.toggle(
    "error-state",
    isError
  );
}

function setFormMessage(
  message: string,
  success = false
): void {
  formMessage.textContent = message;
  formMessage.classList.toggle(
    "success",
    success
  );
}

function updateFavoriteCount(): void {
  favoriteCount.textContent =
    String(favorites.length);
}

function getFilteredBooks(): Book[] {
  const keyword =
    searchInput.value
      .trim()
      .toLocaleLowerCase("vi");

  const selectedGenre =
    genreFilter.value;

  return books.filter((book) => {
    const matchTitle =
      book.title
        .toLocaleLowerCase("vi")
        .includes(keyword);

    const matchGenre =
      selectedGenre === "all" ||
      book.genre === selectedGenre;

    return matchTitle && matchGenre;
  });
}

function refreshBookView(): void {
  const filteredBooks =
    getFilteredBooks();

  renderBooks(
    filteredBooks,
    favorites,
    bookList
  );

  setStatus(
    `Đang hiển thị ${filteredBooks.length} / ${books.length} cuốn.`
  );
}

function refreshGenreFilter(): void {
  renderGenres(
    books,
    genreFilter
  );
}

function toggleFavorite(id: string): void {
  if (favorites.includes(id)) {
    favorites = favorites.filter(
      (favoriteId) =>
        favoriteId !== id
    );
  } else {
    favorites = [
      ...favorites,
      id
    ];
  }

  saveFavorites(favorites);
  updateFavoriteCount();
  refreshBookView();
}

async function loadBooks(): Promise<void> {
  setStatus("Đang tải...");

  try {
    books = await getBooks();

    refreshGenreFilter();
    refreshBookView();
    updateFavoriteCount();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Lỗi không xác định.";

    setStatus(
      `Không thể tải dữ liệu: ${message}`,
      true
    );
  }
}

async function handleDelete(
  id: string
): Promise<void> {
  const book = books.find(
    (item) =>
      String(item.id) === id
  );

  const confirmed =
    window.confirm(
      `Bạn có chắc muốn xóa "${book?.title ?? "cuốn sách này"}"?`
    );

  if (!confirmed) {
    return;
  }

  try {
    await deleteBook(id);

    books = books.filter(
      (item) =>
        String(item.id) !== id
    );

    favorites = favorites.filter(
      (favoriteId) =>
        favoriteId !== id
    );

    saveFavorites(favorites);

    refreshGenreFilter();
    refreshBookView();
    updateFavoriteCount();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Lỗi không xác định.";

    window.alert(
      `Xóa sách thất bại: ${message}`
    );
  }
}

function validateForm(): boolean {
  const existingCodes =
    books.map((book) => book.code);

  const results = [
    validateCode(
      codeInput.value,
      existingCodes
    ),
    validateTitle(
      titleInput.value
    ),
    validateAuthor(
      authorInput.value
    ),
    validateGenre(
      genreInput.value
    ),
    validateYear(
      yearInput.value
    )
  ];

  return results.every(Boolean);
}

searchInput.addEventListener(
  "input",
  refreshBookView
);

genreFilter.addEventListener(
  "change",
  refreshBookView
);

bookList.addEventListener(
  "click",
  async (event: MouseEvent) => {
    const target =
      event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const button =
      target.closest<HTMLButtonElement>(
        "button[data-action]"
      );

    if (!button) {
      return;
    }

    const id =
      button.dataset.id;

    const action =
      button.dataset.action;

    if (!id || !action) {
      return;
    }

    if (action === "favorite") {
      toggleFavorite(id);
    }

    if (action === "delete") {
      await handleDelete(id);
    }
  }
);

codeInput.addEventListener(
  "input",
  () => {
    validateCode(
      codeInput.value,
      books.map((book) => book.code)
    );
  }
);

titleInput.addEventListener(
  "input",
  () =>
    validateTitle(
      titleInput.value
    )
);

authorInput.addEventListener(
  "input",
  () =>
    validateAuthor(
      authorInput.value
    )
);

genreInput.addEventListener(
  "change",
  () =>
    validateGenre(
      genreInput.value
    )
);

yearInput.addEventListener(
  "input",
  () =>
    validateYear(
      yearInput.value
    )
);

form.addEventListener(
  "reset",
  () => {
    window.setTimeout(
      () => {
        clearAllErrors();
        setFormMessage("");
      },
      0
    );
  }
);

form.addEventListener(
  "submit",
  async (event: SubmitEvent) => {
    event.preventDefault();
    setFormMessage("");

    if (!validateForm()) {
      setFormMessage(
        "Vui lòng kiểm tra lại các trường đang báo lỗi."
      );
      return;
    }

    const newBook: NewBook = {
      code:
        codeInput.value.trim(),
      title:
        titleInput.value.trim(),
      author:
        authorInput.value.trim(),
      genre:
        genreInput.value,
      year:
        Number(yearInput.value)
    };

    submitButton.disabled = true;
    submitButton.textContent =
      "Đang thêm...";

    try {
      const createdBook =
        await createBook(newBook);

      books = [
        createdBook,
        ...books
      ];

      form.reset();
      clearAllErrors();

      refreshGenreFilter();
      refreshBookView();

      setFormMessage(
        `Đã thêm "${createdBook.title}" thành công.`,
        true
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Lỗi không xác định.";

      setFormMessage(
        `Thêm sách thất bại: ${message}`
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent =
        "+ Thêm sách";
    }
  }
);

themeButton.addEventListener(
  "click",
  () => {
    const nextTheme:
      "light" | "dark" =
      document.body.classList
        .contains("dark")
        ? "light"
        : "dark";

    document.body.classList.toggle(
      "dark",
      nextTheme === "dark"
    );

    themeButton.textContent =
      nextTheme === "dark"
        ? "☀️"
        : "🌙";

    saveTheme(nextTheme);
  }
);

const initialTheme =
  getTheme();

document.body.classList.toggle(
  "dark",
  initialTheme === "dark"
);

themeButton.textContent =
  initialTheme === "dark"
    ? "☀️"
    : "🌙";

updateFavoriteCount();
loadBooks();
