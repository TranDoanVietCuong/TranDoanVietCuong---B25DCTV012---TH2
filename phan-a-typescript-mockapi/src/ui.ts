import type { Book } from "./types/book";

export function renderBooks(
  books: Book[],
  favorites: string[],
  container: HTMLElement
): void {
  container.replaceChildren();

  if (books.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Không có cuốn sách nào phù hợp.";
    container.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  books.forEach((book) => {
    const card = document.createElement("article");
    card.className = "book-card";

    const top = document.createElement("div");
    top.className = "book-card-top";

    const code = document.createElement("span");
    code.className = "book-code";
    code.textContent = book.code;

    const isFavorite = favorites.includes(String(book.id));

    top.appendChild(code);

    if (isFavorite) {
      const heart = document.createElement("span");
      heart.className = "favorite-badge";
      heart.textContent = "♥";
      top.appendChild(heart);
    }

    const title = document.createElement("h3");
    title.textContent = book.title;

    const meta = document.createElement("div");
    meta.className = "book-meta";

    const author = document.createElement("p");
    author.textContent = `Tác giả: ${book.author}`;

    const genre = document.createElement("p");
    genre.textContent = `Thể loại: ${book.genre}`;

    const year = document.createElement("p");
    year.textContent = `Năm xuất bản: ${book.year}`;

    meta.append(author, genre, year);

    const actions = document.createElement("div");
    actions.className = "book-actions";

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.dataset.action = "favorite";
    favoriteButton.dataset.id = String(book.id);
    favoriteButton.className = isFavorite
      ? "favorite-button is-favorite"
      : "favorite-button";
    favoriteButton.textContent = isFavorite
      ? "❤️ Đã yêu thích"
      : "🤍 Yêu thích";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = String(book.id);
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Xóa";

    actions.append(favoriteButton, deleteButton);
    card.append(top, title, meta, actions);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

export function renderGenres(
  books: Book[],
  select: HTMLSelectElement
): void {
  const currentValue = select.value || "all";

  const genres = [
    ...new Set(
      books
        .map((book) => book.genre.trim())
        .filter(Boolean)
    )
  ].sort((a, b) => a.localeCompare(b, "vi"));

  select.replaceChildren();

  const all = document.createElement("option");
  all.value = "all";
  all.textContent = "Tất cả thể loại";
  select.appendChild(all);

  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    select.appendChild(option);
  });

  const stillExists = [...select.options].some(
    (option) => option.value === currentValue
  );

  select.value = stillExists ? currentValue : "all";
}
