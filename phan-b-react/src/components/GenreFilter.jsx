function GenreFilter({
  genres,
  selectedGenre,
  onChangeGenre
}) {
  return (
    <div
      className="genre-filter"
      aria-label="Lọc sách theo thể loại"
    >
      <button
        type="button"
        className={
          selectedGenre === "all"
            ? "filter-button active"
            : "filter-button"
        }
        onClick={() => onChangeGenre("all")}
      >
        Tất cả
      </button>

      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          className={
            selectedGenre === genre
              ? "filter-button active"
              : "filter-button"
          }
          onClick={() => onChangeGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
