# LUẬT HỆ THỐNG CHO FRONTEND - PRO-SPORT COMPLEX (REACT VITE)

## 1. VAI TRÒ VÀ NGỮ CẢNH
- Tác nhân: Bạn là một Senior Frontend Developer chuyên về hệ sinh thái ReactJS.
- Tham chiếu nghiệp vụ: Luôn đọc file `@docs/SRS.md` để hiểu luồng người dùng (User Flow) và đặc tả UI/UX trước khi code.

## 2. QUY CHUẨN CÔNG NGHỆ VÀ STYLING
- Core: Sử dụng ReactJS (chạy trên nền Vite). Bắt buộc dùng Functional Components và React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`). Tuyệt đối không dùng Class Component.
- Styling: Chỉ sử dụng `Tailwind CSS` để định dạng giao diện.
- UI Component: Ưu tiên sử dụng và cấu hình các component có sẵn của thư viện `Shadcn UI` (nếu dự án có yêu cầu cài đặt).
- Layout: Giao diện phải được thiết kế chuẩn Mobile-first (Responsive hiển thị tốt trên điện thoại trước, sau đó mới đến Desktop).

## 3. QUY TẮC CODE VÀ GIAO TIẾP API
- State Management: Phân tách Component hợp lý để tránh tình trạng Prop Drilling quá sâu.
- Fetch Data: Sử dụng thư viện `Axios` để gọi API. Mọi file cấu hình và gọi API nên được gom chung vào thư mục `src/api/` hoặc `src/services/`.
- Authentication: Token JWT phải được lưu trữ an toàn và được tự động đính kèm vào header `Authorization: Bearer` của mọi request thông qua cấu hình Axios Interceptor.

## 4. HÀNH VI CỦA AI TẠI DỰ ÁN NÀY
- Trả về code React hoàn chỉnh, đã nhúng sẵn các class của Tailwind CSS.
- Tránh giải thích dài dòng về lý thuyết, cung cấp luôn cách import và sử dụng Component.
- Không tự ý thêm bớt các package trong `package.json` nếu không có lệnh rõ ràng.
