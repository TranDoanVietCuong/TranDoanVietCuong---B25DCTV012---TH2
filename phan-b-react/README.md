# Phần B — React tổng hợp đầy đủ

Đây là bản Phần B đã được mở rộng để vừa đáp ứng yêu cầu React riêng, vừa thể hiện đầy đủ các mục tiêu chung của bài thực hành.

## Cách chạy

Mở Terminal tại thư mục project:

```bash
npm install
npm run dev
```

Lệnh `npm run dev` sẽ chạy đồng thời:

- React/Vite: `http://localhost:5173`
- API local: `http://localhost:3001`

Nếu PowerShell chặn `npm.ps1`, dùng:

```powershell
npm.cmd install
npm.cmd run dev
```

hoặc dùng Command Prompt trong VS Code.

---

# 1. Đối chiếu 4 mục tiêu chung

## Mục tiêu 1 — DOM, sự kiện, validate form bằng JavaScript

Đã có:

- Xử lý sự kiện bằng React event handlers:
  - `onClick`
  - `onChange`
  - `onSubmit`
- Validate form bằng JavaScript trong `AddBookForm.jsx`.
- Validate khi gõ và khi submit.
- Có thao tác DOM bằng `useEffect` trong `App.jsx`:
  - `document.body.classList.toggle(...)`
  - `document.documentElement.dataset.theme = ...`
  - `document.title = ...`

Lưu ý: React không nên dùng `querySelector/createElement` cho giao diện chính vì React tự quản lý DOM.

## Mục tiêu 2 — API, fetch, async/await, JSON, localStorage

Đã có API thật chạy local:

```text
GET    /api/books
POST   /api/books
DELETE /api/books/:id
```

Frontend gọi API bằng `fetch + async/await` trong:

```text
src/services/bookApi.js
```

API đọc/ghi dữ liệu JSON thật tại:

```text
server/data/books.json
```

`localStorage` được dùng cho:

- sách yêu thích;
- theme sáng/tối;
- cache danh sách sách để fallback nếu API lỗi.

## Mục tiêu 3 — React component, props, children, useState

Đã có:

- `Header`
- `Section`
- `GenreFilter`
- `BookList`
- `BookCard`
- `Footer`

Ngoài ra có thêm:

- `Toolbar`
- `StatusLine`
- `AddBookForm`

`Section` sử dụng `children`.

`App` quản lý state bằng `useState`.

Dữ liệu và callback được truyền qua `props`.

Danh sách sử dụng `key={book.id}`.

## Mục tiêu 4 — So sánh DOM thuần và React

Xem phần cuối README này.

---

# 2. Yêu cầu giao diện chung

Đã có đầy đủ:

- Header:
  - tên thư viện;
  - số sách yêu thích;
  - dark mode.
- Thanh công cụ:
  - tìm theo tên;
  - lọc theo thể loại.
- Trạng thái:
  - `Đang tải...`;
  - thông báo lỗi;
  - `Đang hiển thị x / y cuốn`.
- Lưới sách:
  - 3 cột desktop;
  - 2 cột tablet;
  - 1 cột mobile;
  - nút Yêu thích;
  - nút Xóa.
- Form thêm sách.

---

# 3. Yêu cầu chức năng chi tiết

## Tìm kiếm và lọc

- Tìm theo tên ngay khi gõ.
- Thể loại lấy từ `Set`.
- Có thể tìm kiếm + lọc cùng lúc.
- Hiển thị `x / y cuốn`.

## Yêu thích

- Có thể yêu thích / bỏ yêu thích.
- Header cập nhật số lượng.
- Lưu bằng JSON + `localStorage`.

## Xóa

- Có `confirm`.
- Gọi `DELETE /api/books/:id`.
- Sau khi xóa, giao diện cập nhật.
- Nếu sách đang yêu thích, ID cũng bị xóa khỏi favorites.

## Thêm sách

Validate:

- mã sách bắt buộc và không được trùng;
- tên ít nhất 3 ký tự;
- tác giả bắt buộc;
- phải chọn thể loại;
- năm từ 1900 đến năm hiện tại.

Validate diễn ra khi gõ và khi submit.

Nếu hợp lệ:

- gọi `POST /api/books`;
- API ghi vào JSON;
- sách mới hiển thị ở đầu danh sách.

---

# 4. Cấu trúc component đúng theo đề

```text
src/components/
├── Header.jsx
├── Section.jsx
├── GenreFilter.jsx
├── BookList.jsx
├── BookCard.jsx
├── Footer.jsx
├── Toolbar.jsx
├── StatusLine.jsx
└── AddBookForm.jsx
```

Các component bắt buộc của đề đều tồn tại đúng tên.

---

# 5. Cấu trúc project

```text
phan-b-thu-vien-react-final/
├── index.html
├── package.json
├── vite.config.js
├── README.md
│
├── server/
│   ├── server.js
│   └── data/
│       └── books.json
│
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    │
    ├── data/
    │   └── books.js
    │
    ├── services/
    │   ├── bookApi.js
    │   └── storage.js
    │
    └── components/
        ├── Header.jsx
        ├── Section.jsx
        ├── GenreFilter.jsx
        ├── Toolbar.jsx
        ├── StatusLine.jsx
        ├── BookList.jsx
        ├── BookCard.jsx
        ├── AddBookForm.jsx
        └── Footer.jsx
```

`src/data/books.js` vẫn tồn tại như dữ liệu dự phòng và giúp giữ cấu trúc dữ liệu riêng theo yêu cầu React cơ bản.

---

# 6. So sánh JavaScript DOM thuần và React

## JavaScript thuần

Phần A thao tác DOM trực tiếp:

```js
const card = document.createElement("article");
card.textContent = "Clean Code";
container.appendChild(card);
```

Khi dữ liệu thay đổi, lập trình viên tự cập nhật DOM.

Ưu điểm:

- đơn giản cho ứng dụng nhỏ;
- giúp hiểu rõ DOM;
- không cần framework.

Nhược điểm:

- phải tự đồng bộ dữ liệu với giao diện;
- code khó quản lý hơn khi giao diện phức tạp.

## React

React mô tả giao diện bằng component và JSX:

```jsx
<BookCard book={book} />
```

State:

```jsx
const [books, setBooks] = useState([]);
```

Khi state thay đổi, React tự cập nhật giao diện.

Ưu điểm:

- component dễ tái sử dụng;
- state và props giúp luồng dữ liệu rõ ràng;
- dễ mở rộng ứng dụng lớn;
- ít phải thao tác DOM trực tiếp.

Nhược điểm:

- cần học JSX, component, props, state, hook;
- cần môi trường build như Vite.

## Kết luận

Phần A tập trung vào cách DOM hoạt động trực tiếp.

Phần B tập trung vào cách React quản lý giao diện dựa trên state và component, nhưng bản tổng hợp này vẫn kết hợp thêm API, JSON, localStorage, event handling và validation để bao phủ toàn bộ mục tiêu bài thực hành.
