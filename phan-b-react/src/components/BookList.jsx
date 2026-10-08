import BookCard from "./BookCard";

function BookList({
  books,
  favorites,
  deletingId,
  onToggleFavorite,
  onDelete
}) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        Không có cuốn sách nào phù hợp.
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favorites.includes(String(book.id))}
          deleting={String(deletingId) === String(book.id)}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BookList;
