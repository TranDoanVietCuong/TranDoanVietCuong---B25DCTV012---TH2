# TranDoanVietCuong - B25DCTV012 - TH2

Bài thực hành xây dựng ứng dụng quản lý thư viện theo hai cách khác nhau:

- **Phần A:** TypeScript + DOM thuần + MockAPI
- **Phần B:** React + local API + `books.json`

Cả hai phần đều triển khai các chức năng quản lý sách cơ bản như tìm kiếm, lọc, yêu thích, thêm, xóa và kiểm tra dữ liệu nhập.

---

## Phần A — TypeScript + DOM + MockAPI

Phần A sử dụng TypeScript để thao tác trực tiếp với DOM.

### Công nghệ

- HTML
- CSS
- TypeScript
- Vite
- MockAPI
- Fetch API
- localStorage

### Chức năng

- Hiển thị danh sách sách
- Tìm kiếm sách theo tên
- Lọc theo thể loại
- Kết hợp tìm kiếm và lọc
- Hiển thị số sách đang được hiển thị
- Yêu thích / bỏ yêu thích sách
- Lưu sách yêu thích bằng `localStorage`
- Thêm sách mới
- Validate form khi nhập và khi submit
- Xóa sách có xác nhận
- Dark mode
- Responsive

### API

Dữ liệu sách được lưu trên MockAPI.

```text
GET    /Books
POST   /Books
DELETE /Books/:id
