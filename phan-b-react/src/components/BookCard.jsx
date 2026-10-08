function BookCard({
  book,
  isFavorite,
  deleting,
  onToggleFavorite,
  onDelete
}) {
  return (
    <article className="book-card">
      <div className="book-card-top">
        <span className="book-code">
          {book.code}
        </span>

        {isFavorite && (
          <span
            className="favorite-badge"
            aria-label="Sách yêu thích"
          >
            ♥
          </span>
        )}
      </div>

      <h3>{book.title}</h3>

      <div className="book-meta">
        <p>
          <strong>Tác giả:</strong> {book.author}
        </p>

        <p>
          <strong>Thể loại:</strong> {book.genre}
        </p>

        <p>
          <strong>Năm xuất bản:</strong> {book.year}
        </p>
      </div>

      <div className="book-actions">
        <button
          type="button"
          className={
            isFavorite
              ? "favorite-button is-favorite"
              : "favorite-button"
          }
          onClick={() =>
            onToggleFavorite(book.id)
          }
        >
          {isFavorite
            ? "❤️ Đã yêu thích"
            : "🤍 Yêu thích"}
        </button>

        <button
          type="button"
          className="delete-button"
          disabled={deleting}
          onClick={() => onDelete(book)}
        >
          {deleting ? "Đang xóa..." : "Xóa"}
        </button>
      </div>
    </article>
  );
}

export default BookCard;
