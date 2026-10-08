# Library Web Practice

Bài thực hành xây dựng ứng dụng quản lý thư viện theo hai cách khác nhau: DOM thuần với TypeScript và React.

## Phần A — TypeScript + DOM + MockAPI

Phần A sử dụng TypeScript để thao tác DOM trực tiếp.

Chức năng chính:
- Tìm kiếm và lọc sách
- Thêm / xóa sách
- Yêu thích sách
- Validate form
- Dark mode
- Gọi API bằng `fetch + async/await`
- Dữ liệu sách lưu trên MockAPI
- Favorite và theme lưu bằng `localStorage`

Công nghệ:
- HTML
- CSS
- TypeScript
- Vite
- MockAPI

## Phần B — React

Phần B xây dựng cùng giao diện bằng React, tập trung vào cách tổ chức giao diện bằng component.

Chức năng chính:
- Tìm kiếm và lọc sách
- Thêm / xóa sách
- Yêu thích sách
- Validate form
- Dark mode
- Dữ liệu sách được lưu cục bộ trong project

Công nghệ:
- React
- Vite
- JSX
- `useState`
- Props
- Children
- localStorage

## So sánh

| Phần A | Phần B |
|---|---|
| Thao tác DOM trực tiếp | React tự cập nhật giao diện |
| Dùng `createElement`, `textContent`, `addEventListener` | Dùng JSX và event như `onClick`, `onChange` |
| Quản lý dữ liệu bằng biến JavaScript | Quản lý dữ liệu bằng state |
| Dữ liệu sách lấy từ MockAPI | Dữ liệu sách nằm trong project |
| TypeScript | React + JavaScript/JSX |
| Phù hợp để hiểu DOM và JavaScript nền tảng | Dễ chia nhỏ, tái sử dụng và quản lý giao diện lớn |

## Kết luận

Phần A giúp hiểu rõ cách JavaScript thao tác trực tiếp với DOM và làm việc với API.

Phần B cho thấy cách React đơn giản hóa việc xây dựng giao diện bằng component, props và state.
