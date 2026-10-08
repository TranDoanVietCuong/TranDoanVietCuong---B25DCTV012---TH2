import GenreFilter from "./GenreFilter";

function Toolbar({
  searchTerm,
  onSearchChange,
  genres,
  selectedGenre,
  onChangeGenre
}) {
  return (
    <div className="toolbar">
      <label className="field">
        <span>Tìm theo tên sách</span>

        <input
          type="search"
          value={searchTerm}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Ví dụ: Clean Code..."
          autoComplete="off"
        />
      </label>

      <div className="field">
        <span>Thể loại</span>

        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onChangeGenre={onChangeGenre}
        />
      </div>
    </div>
  );
}

export default Toolbar;
