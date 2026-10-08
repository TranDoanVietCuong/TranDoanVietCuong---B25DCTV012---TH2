import {
  useEffect,
  useMemo,
  useState
} from "react";

import Header from "./components/Header";
import Section from "./components/Section";
import Toolbar from "./components/Toolbar";
import StatusLine from "./components/StatusLine";
import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";
import Footer from "./components/Footer";

import { fallbackBooks } from "./data/books";

import {
  createBook,
  deleteBook,
  getBooks
} from "./services/bookApi";

import {
  getBookCache,
  getFavorites,
  getTheme,
  saveBookCache,
  saveFavorites,
  saveTheme
} from "./services/storage";

function App() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] =
    useState(getFavorites);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedGenre,
    setSelectedGenre
  ] = useState("all");

  const [theme, setTheme] =
    useState(getTheme);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [source, setSource] =
    useState("API");

  const [adding, setAdding] =
    useState(false);

  const [
    deletingId,
    setDeletingId
  ] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      setError("");

      try {
        const apiBooks =
          await getBooks();

        setBooks(apiBooks);
        saveBookCache(apiBooks);
        setSource("API + JSON");
      } catch (apiError) {
        const cache =
          getBookCache();

        if (
          Array.isArray(cache) &&
          cache.length > 0
        ) {
          setBooks(cache);
          setSource("localStorage cache");
        } else {
          setBooks(fallbackBooks);
          setSource("books.js dự phòng");
        }

        setError(apiError.message);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    // Có thao tác DOM trong React thông qua side effect.
    document.body.classList.toggle(
      "dark",
      theme === "dark"
    );

    document.documentElement.dataset.theme =
      theme;

    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    // Một thao tác DOM nhỏ khác: cập nhật tiêu đề tab.
    document.title =
      `Thư viện lớp học (${favorites.length} yêu thích)`;
  }, [favorites.length]);

  const genres = useMemo(() => {
    return [
      ...new Set(
        books.map((book) => book.genre)
      )
    ].sort((a, b) =>
      a.localeCompare(b, "vi")
    );
  }, [books]);

  const filteredBooks = useMemo(() => {
    const keyword = searchTerm
      .trim()
      .toLocaleLowerCase("vi");

    return books.filter((book) => {
      const matchTitle =
        String(book.title)
          .toLocaleLowerCase("vi")
          .includes(keyword);

      const matchGenre =
        selectedGenre === "all" ||
        book.genre === selectedGenre;

      return (
        matchTitle &&
        matchGenre
      );
    });
  }, [
    books,
    searchTerm,
    selectedGenre
  ]);

  function toggleFavorite(bookId) {
    const id = String(bookId);

    setFavorites(
      (currentFavorites) => {
        if (
          currentFavorites.includes(id)
        ) {
          return currentFavorites.filter(
            (favoriteId) =>
              favoriteId !== id
          );
        }

        return [
          ...currentFavorites,
          id
        ];
      }
    );
  }

  async function handleAddBook(book) {
    setAdding(true);

    try {
      const created =
        await createBook(book);

      setBooks((currentBooks) => {
        const nextBooks = [
          created,
          ...currentBooks
        ];

        saveBookCache(nextBooks);
        return nextBooks;
      });

      setSearchTerm("");
      setSelectedGenre("all");
      setSource("API + JSON");
      setError("");

      return created;
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(book) {
    const confirmed =
      window.confirm(
        `Bạn có chắc muốn xóa "${book.title}"?`
      );

    if (!confirmed) {
      return;
    }

    setDeletingId(book.id);

    try {
      await deleteBook(book.id);

      setBooks((currentBooks) => {
        const nextBooks =
          currentBooks.filter(
            (item) =>
              String(item.id) !==
              String(book.id)
          );

        saveBookCache(nextBooks);
        return nextBooks;
      });

      setFavorites(
        (currentFavorites) =>
          currentFavorites.filter(
            (id) =>
              id !== String(book.id)
          )
      );

      setError("");
      setSource("API + JSON");
    } catch (deleteError) {
      window.alert(
        `Xóa sách thất bại: ${deleteError.message}`
      );
    } finally {
      setDeletingId(null);
    }
  }

  function handleToggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark"
        ? "light"
        : "dark"
    );
  }

  return (
    <>
      <Header
        favoriteCount={
          favorites.length
        }
        theme={theme}
        onToggleTheme={
          handleToggleTheme
        }
      />

      <main className="container">
        <Section
          eyebrow="Công cụ"
          title="Tìm kiếm và lọc"
        >
          <Toolbar
            searchTerm={searchTerm}
            onSearchChange={
              setSearchTerm
            }
            genres={genres}
            selectedGenre={
              selectedGenre
            }
            onChangeGenre={
              setSelectedGenre
            }
          />

          <StatusLine
            loading={loading}
            error={error}
            shownCount={
              filteredBooks.length
            }
            totalCount={books.length}
            source={source}
          />
        </Section>

        <Section
          eyebrow="Danh sách"
          title="Các đầu sách"
        >
          <BookList
            books={filteredBooks}
            favorites={favorites}
            deletingId={deletingId}
            onToggleFavorite={
              toggleFavorite
            }
            onDelete={
              handleDelete
            }
          />
        </Section>

        <Section
          eyebrow="Biểu mẫu"
          title="Thêm sách mới"
        >
          <AddBookForm
            genres={genres}
            existingBooks={books}
            adding={adding}
            onAddBook={
              handleAddBook
            }
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}

export default App;
