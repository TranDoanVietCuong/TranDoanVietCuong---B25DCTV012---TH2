type FieldName = "code" | "title" | "author" | "genre" | "year";

function getErrorElement(field: FieldName): HTMLElement {
  const element = document.querySelector<HTMLElement>(
    `#${field}-error`
  );

  if (!element) {
    throw new Error(`Không tìm thấy phần tử lỗi của ${field}.`);
  }

  return element;
}

function setError(
  field: FieldName,
  message: string
): void {
  getErrorElement(field).textContent = message;
}

export function clearAllErrors(): void {
  (["code", "title", "author", "genre", "year"] as FieldName[])
    .forEach((field) => setError(field, ""));
}

export function validateCode(
  value: string,
  existingCodes: string[]
): boolean {
  const code = value.trim();

  if (!code) {
    setError("code", "Mã sách không được để trống.");
    return false;
  }

  const duplicated = existingCodes.some(
    (existingCode) =>
      existingCode.trim().toLocaleLowerCase("vi") ===
      code.toLocaleLowerCase("vi")
  );

  if (duplicated) {
    setError("code", "Mã sách đã tồn tại.");
    return false;
  }

  setError("code", "");
  return true;
}

export function validateTitle(value: string): boolean {
  if (value.trim().length < 3) {
    setError("title", "Tên sách phải có ít nhất 3 ký tự.");
    return false;
  }

  setError("title", "");
  return true;
}

export function validateAuthor(value: string): boolean {
  if (!value.trim()) {
    setError("author", "Tác giả không được để trống.");
    return false;
  }

  setError("author", "");
  return true;
}

export function validateGenre(value: string): boolean {
  if (!value) {
    setError("genre", "Vui lòng chọn thể loại.");
    return false;
  }

  setError("genre", "");
  return true;
}

export function validateYear(value: string): boolean {
  const year = Number(value);
  const currentYear = new Date().getFullYear();

  if (!value || !Number.isInteger(year)) {
    setError("year", "Vui lòng nhập năm hợp lệ.");
    return false;
  }

  if (year < 1900 || year > currentYear) {
    setError(
      "year",
      `Năm phải từ 1900 đến ${currentYear}.`
    );
    return false;
  }

  setError("year", "");
  return true;
}
