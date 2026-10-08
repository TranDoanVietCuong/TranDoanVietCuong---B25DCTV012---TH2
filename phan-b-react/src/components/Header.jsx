function Header({
  favoriteCount,
  theme,
  onToggleTheme
}) {
  return (
    <header className="site-header">
      <div className="header-content">
        <div>
          <p className="eyebrow header-eyebrow">
            React tổng hợp
          </p>

          <h1>📚 Thư viện lớp học</h1>

          <p className="header-subtitle">
            Sách yêu thích:{" "}
            <strong>{favoriteCount}</strong>
          </p>
        </div>

        <button
          type="button"
          className="theme-button"
          onClick={onToggleTheme}
          aria-label="Chuyển chế độ sáng tối"
          title="Chuyển chế độ sáng tối"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Header;
