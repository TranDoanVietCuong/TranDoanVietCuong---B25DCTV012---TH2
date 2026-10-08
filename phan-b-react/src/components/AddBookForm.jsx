import { useState } from "react";

const EMPTY_FORM = {
  code: "",
  title: "",
  author: "",
  genre: "",
  year: ""
};

const EMPTY_ERRORS = {
  code: "",
  title: "",
  author: "",
  genre: "",
  year: ""
};

function AddBookForm({
  genres,
  existingBooks,
  adding,
  onAddBook
}) {
  const [formData, setFormData] =
    useState(EMPTY_FORM);

  const [errors, setErrors] =
    useState(EMPTY_ERRORS);

  const [message, setMessage] =
    useState("");

  function validateField(name, value) {
    const currentYear =
      new Date().getFullYear();

    if (name === "code") {
      const code = value.trim();

      if (!code) {
        return "Mã sách không được để trống.";
      }

      const duplicated =
        existingBooks.some(
          (book) =>
            String(book.code)
              .trim()
              .toLocaleLowerCase("vi") ===
            code.toLocaleLowerCase("vi")
        );

      if (duplicated) {
        return "Mã sách đã tồn tại.";
      }
    }

    if (
      name === "title" &&
      value.trim().length < 3
    ) {
      return "Tên sách phải có ít nhất 3 ký tự.";
    }

    if (
      name === "author" &&
      !value.trim()
    ) {
      return "Tác giả không được để trống.";
    }

    if (
      name === "genre" &&
      !value
    ) {
      return "Vui lòng chọn thể loại.";
    }

    if (name === "year") {
      const year = Number(value);

      if (
        !value ||
        !Number.isInteger(year)
      ) {
        return "Vui lòng nhập năm hợp lệ.";
      }

      if (
        year < 1900 ||
        year > currentYear
      ) {
        return `Năm phải từ 1900 đến ${currentYear}.`;
      }
    }

    return "";
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value)
    }));

    setMessage("");
  }

  function validateForm() {
    const nextErrors = {
      code: validateField(
        "code",
        formData.code
      ),
      title: validateField(
        "title",
        formData.title
      ),
      author: validateField(
        "author",
        formData.author
      ),
      genre: validateField(
        "genre",
        formData.genre
      ),
      year: validateField(
        "year",
        formData.year
      )
    };

    setErrors(nextErrors);

    return !Object.values(
      nextErrors
    ).some(Boolean);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!validateForm()) {
      setMessage(
        "Vui lòng kiểm tra lại các trường đang báo lỗi."
      );
      return;
    }

    const newBook = {
      code: formData.code.trim(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre,
      year: Number(formData.year)
    };

    try {
      const created =
        await onAddBook(newBook);

      setFormData(EMPTY_FORM);
      setErrors(EMPTY_ERRORS);

      setMessage(
        `Đã thêm "${created.title}" thành công.`
      );
    } catch (error) {
      setMessage(
        `Thêm sách thất bại: ${error.message}`
      );
    }
  }

  function handleReset() {
    setFormData(EMPTY_FORM);
    setErrors(EMPTY_ERRORS);
    setMessage("");
  }

  return (
    <form
      className="book-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-grid">
        <label className="field">
          <span>Mã sách</span>

          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Ví dụ: B011"
            autoComplete="off"
          />

          <small className="error">
            {errors.code}
          </small>
        </label>

        <label className="field">
          <span>Tên sách</span>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ít nhất 3 ký tự"
            autoComplete="off"
          />

          <small className="error">
            {errors.title}
          </small>
        </label>

        <label className="field">
          <span>Tác giả</span>

          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Tên tác giả"
            autoComplete="off"
          />

          <small className="error">
            {errors.author}
          </small>
        </label>

        <label className="field">
          <span>Thể loại</span>

          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">
              -- Chọn thể loại --
            </option>

            {genres.map((genre) => (
              <option
                key={genre}
                value={genre}
              >
                {genre}
              </option>
            ))}
          </select>

          <small className="error">
            {errors.genre}
          </small>
        </label>

        <label className="field">
          <span>Năm xuất bản</span>

          <input
            name="year"
            type="number"
            min="1900"
            value={formData.year}
            onChange={handleChange}
            placeholder="Ví dụ: 2024"
          />

          <small className="error">
            {errors.year}
          </small>
        </label>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="primary-button"
          disabled={adding}
        >
          {adding
            ? "Đang thêm..."
            : "+ Thêm sách"}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={handleReset}
          disabled={adding}
        >
          Xóa nội dung
        </button>
      </div>

      <p
        className={
          message.includes("thành công")
            ? "form-message success"
            : "form-message"
        }
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}

export default AddBookForm;
