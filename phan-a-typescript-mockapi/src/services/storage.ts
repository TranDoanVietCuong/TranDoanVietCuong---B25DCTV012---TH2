const FAVORITES_KEY = "tsLibraryFavorites";
const THEME_KEY = "tsLibraryTheme";

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed.map(String)
      : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: string[]): void {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );
}

export function getTheme(): "light" | "dark" {
  const value = localStorage.getItem(THEME_KEY);
  return value === "dark" ? "dark" : "light";
}

export function saveTheme(theme: "light" | "dark"): void {
  localStorage.setItem(THEME_KEY, theme);
}
