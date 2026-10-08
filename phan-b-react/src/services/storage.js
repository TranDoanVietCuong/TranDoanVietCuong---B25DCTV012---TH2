const BOOK_CACHE_KEY = "reactLibraryBookCache";
const FAVORITES_KEY = "reactLibraryFavorites";
const THEME_KEY = "reactLibraryTheme";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function getBookCache() {
  return readJson(BOOK_CACHE_KEY, null);
}

export function saveBookCache(books) {
  localStorage.setItem(
    BOOK_CACHE_KEY,
    JSON.stringify(books)
  );
}

export function getFavorites() {
  const favorites = readJson(FAVORITES_KEY, []);
  return Array.isArray(favorites)
    ? favorites.map(String)
    : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites.map(String))
  );
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
