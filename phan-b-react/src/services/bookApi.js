const API_URL = "/api/books";

async function request(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    let message = `HTTP ${response.status}`;

    try {
      const data = await response.json();
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Giữ message mặc định nếu body không phải JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getBooks() {
  return request(API_URL);
}

export async function createBook(book) {
  return request(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
  });
}

export async function deleteBook(id) {
  return request(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
}
