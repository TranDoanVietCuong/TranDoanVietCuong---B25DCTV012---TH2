const API_URL =
  "https://6ac711b975a4ce3fe7215691.mockapi.io/Books";

const books = [
  {
    code: "B001",
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Công nghệ",
    year: 2008
  },
  {
    code: "B002",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    genre: "Công nghệ",
    year: 1999
  },
  {
    code: "B003",
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    genre: "Văn học",
    year: 1941
  },
  {
    code: "B004",
    title: "Số Đỏ",
    author: "Vũ Trọng Phụng",
    genre: "Văn học",
    year: 1936
  },
  {
    code: "B005",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    genre: "Khoa học",
    year: 1988
  },
  {
    code: "B006",
    title: "Cosmos",
    author: "Carl Sagan",
    genre: "Khoa học",
    year: 1980
  },
  {
    code: "B007",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    genre: "Công nghệ",
    year: 2020
  },
  {
    code: "B008",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    genre: "Văn học",
    year: 1988
  },
  {
    code: "B009",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    genre: "Khoa học",
    year: 1976
  },
  {
    code: "B010",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Kỹ năng",
    year: 2018
  }
];

async function seed() {
  for (const book of books) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    });

    if (!response.ok) {
      console.error(
        "Lỗi:",
        book.title,
        response.status
      );
      continue;
    }

    const created = await response.json();

    console.log(
      "Đã thêm:",
      created.id,
      created.title
    );
  }

  console.log("Hoàn tất.");
}

seed();