# So sánh Phần A và Phần B

Bài thực hành xây dựng cùng một ứng dụng quản lý thư viện bằng hai cách triển khai khác nhau:

- **Phần A:** TypeScript + DOM thuần + MockAPI
- **Phần B:** React + Local API + `books.json`

Mục tiêu chính là so sánh cách thao tác giao diện trực tiếp bằng DOM với cách xây dựng giao diện bằng React.

---

## Phần A — TypeScript + DOM + MockAPI

Phần A sử dụng TypeScript để thao tác trực tiếp với DOM.

Các thao tác giao diện được thực hiện bằng các API DOM như:

```ts
document.querySelector()
document.createElement()
element.textContent = ...
element.addEventListener(...)
```

Dữ liệu sách được lấy từ MockAPI bằng `fetch` và `async/await`.

Các thao tác chính với API:

```text
GET    /Books
POST   /Books
DELETE /Books/:id
```

Ngoài ra, `localStorage` được sử dụng để lưu:

- Danh sách sách yêu thích
- Chế độ sáng / tối

Phần A giúp làm rõ cách JavaScript/TypeScript thao tác trực tiếp với DOM, sự kiện và API.

---

## Phần B — React + Local API + books.json

Phần B xây dựng cùng bài toán bằng React.

Giao diện được chia thành các component:

```text
Header
Section
GenreFilter
BookList
BookCard
Footer
```

Ngoài ra còn có các component hỗ trợ như:

```text
Toolbar
StatusLine
AddBookForm
```

Dữ liệu và trạng thái giao diện được quản lý bằng:

```jsx
useState
props
children
```

Khi state thay đổi, React tự render lại phần giao diện liên quan mà không cần thao tác DOM trực tiếp cho các thành phần giao diện chính.

Dữ liệu sách được lưu cục bộ trong:

```text
server/data/books.json
```

React giao tiếp với local API để đọc, thêm và xóa sách:

```text
GET    /api/books
POST   /api/books
DELETE /api/books/:id
```

`localStorage` được sử dụng để lưu:

- Danh sách sách yêu thích
- Chế độ sáng / tối
- Cache dữ liệu khi cần

Phần B giúp làm rõ cách React tổ chức giao diện bằng component, props và state.

---

## So sánh Phần A và Phần B

| Tiêu chí | Phần A | Phần B |
|---|---|---|
| Công nghệ chính | TypeScript | React + JSX |
| Cách xây dựng giao diện | DOM thuần | Component |
| Tạo phần tử | `createElement()` | JSX |
| Cập nhật nội dung | `textContent` | React render |
| Xử lý sự kiện | `addEventListener()` | `onClick`, `onChange`, `onSubmit` |
| Quản lý trạng thái | Biến và mảng TypeScript | React state với `useState` |
| Cập nhật giao diện | Thực hiện thủ công | React tự render lại |
| Nguồn dữ liệu | MockAPI | Local API + `books.json` |
| Lưu dữ liệu sách | Trên MockAPI | Trong project |
| Lưu yêu thích / theme | `localStorage` | `localStorage` |
| Cấu trúc giao diện | DOM và module TypeScript | Component, props, children |
| Khả năng tái sử dụng UI | Thấp hơn | Cao hơn |

---

## Nhận xét

### Phần A

**Ưu điểm:**

- Giúp hiểu rõ cách DOM hoạt động.
- Dễ thấy trực tiếp quá trình tạo, sửa và xóa phần tử.
- Giúp luyện tập TypeScript, event handling, Fetch API và `async/await`.

**Nhược điểm:**

- Phải tự cập nhật DOM khi dữ liệu thay đổi.
- Khi giao diện phức tạp, code dễ trở nên khó quản lý.
- Khả năng tái sử dụng giao diện thấp hơn React.

### Phần B

**Ưu điểm:**

- Giao diện được chia thành các component rõ ràng.
- Có thể tái sử dụng component.
- Props giúp truyền dữ liệu giữa các component.
- State giúp quản lý dữ liệu giao diện thuận tiện.
- React tự cập nhật giao diện khi state thay đổi.

**Nhược điểm:**

- Cần học thêm JSX, component, props, state và hook.
- Cần môi trường build như Vite.
- Cấu trúc ban đầu phức tạp hơn DOM thuần.

---

## Kết luận

Phần A giúp hiểu nền tảng của JavaScript/TypeScript khi thao tác trực tiếp với DOM và làm việc với API.

Phần B cho thấy cách React tổ chức cùng một bài toán theo hướng component hóa, quản lý trạng thái bằng state và tự động cập nhật giao diện.

Qua hai phần có thể thấy React phù hợp hơn với các giao diện lớn và cần tái sử dụng nhiều component, trong khi DOM thuần giúp hiểu rõ hơn cách trình duyệt và JavaScript hoạt động ở mức cơ bản.
