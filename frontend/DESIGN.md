# DESIGN TASTE SKILL (Frontend Rules)

## 1. Triết Lý Cốt Lõi (Core Philosophy)
- **Say NO to AI Slop**: Tuyệt đối không sử dụng các pattern giao diện điển hình của AI sinh ra (như màu tím gradient nhạt nhẽo, layout 3 thẻ bài rập khuôn, các box mờ mờ mịt mịt thiếu tương phản).
- **Less is More**: Loại bỏ hoàn toàn các thẻ `<div>` lồng nhau vô nghĩa (div soup). HTML phải semantic, phẳng và gọn gàng.
- **Premium Feel**: Giao diện cần phải toát lên sự cao cấp thông qua typography sắc nét, khoảng trắng (whitespace) được kiểm soát kỹ lưỡng và các tiểu tiết bóng đổ (shadows) tinh tế, không lạm dụng.

## 2. Typography & Khoảng trắng (Spacing)
- **Typography**: Đừng phụ thuộc vào kích thước text mặc định. Hãy tạo sự tương phản mạnh mẽ giữa tiêu đề (Heading) và nội dung (Body text) thông qua Font Weight và Tracking (Letter spacing). 
- **Breathing Room**: Hãy để các component "thở". Padding và Margin phải rộng rãi nhưng có tính hệ thống (ví dụ: dùng scale của Tailwind như `p-6`, `gap-8` thay vì những khoảng cách chật chội).

## 3. Màu Sắc & Hiệu Ứng (Colors & Effects)
- Tránh xa gradient cầu vồng, gradient tím/hồng chói lóa. Dùng gradient một cách cực kỳ kiềm chế (subtle, monochromatic) nếu cần.
- Borders và Shadows phải tinh tế. Dùng màu border như `border-slate-200/50` thay vì đen/xám gắt.
- **Interactive UI**: Hover states phải mượt mà (dùng `transition-all duration-300`), thay đổi màu nền nhẹ nhàng hoặc nâng thẻ lên chút xíu (`hover:-translate-y-1 hover:shadow-lg`).

## 4. Bố Cục (Layout)
- Vượt ra khỏi "bố cục 3 cột tiêu chuẩn". Hãy thử các hệ lưới (grid) bất đối xứng (asymmetrical), bento box, hoặc masonry khi hiển thị nhiều nội dung.
- Chiều cao các sections cần rộng rãi, thường là `min-h-[50vh]` thay vì bó hẹp nội dung.

## 5. Tailwind CSS Guidelines
- **Không nhồi nhét class**: Rút gọn các chuỗi class dài ngoằng. Nếu các thẻ có chung style, hãy sử dụng group styles hoặc chuyển nó thành một abstraction hợp lý.
- **Micro-interactions**: Tận dụng triệt để `group-hover`, `peer`, `focus-within` để tăng tính tương tác.
