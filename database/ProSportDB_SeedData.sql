-- ============================================================================
-- PRO-SPORT COMPLEX — Seed Data Script
-- Target: Microsoft SQL Server 2019+
-- Prerequisite: Chạy file ProSportDB_Schema.sql trước khi chạy file này.
-- Author: Senior Database Engineer (AI-Assisted)
-- Date: 2026-05-26
-- ============================================================================
-- HƯỚNG DẪN: Chạy file này trên SSMS sau khi đã tạo xong Schema.
-- Script sẽ chèn dữ liệu mẫu để test API.
-- ============================================================================

USE [ProSportDB];
GO

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO


-- ============================================================================
-- 1. USERS — 3 tài khoản mẫu (Admin, Staff, Customer)
-- ============================================================================
-- Lưu ý: PasswordHash dưới đây là BCrypt hash của chuỗi "Password@123"
-- Trong môi trường production, phải hash bằng BCrypt ở tầng Application.

SET IDENTITY_INSERT [dbo].[Users] ON;

INSERT INTO [dbo].[Users] ([UserId], [FullName], [Email], [PasswordHash], [PhoneNumber], [Role], [EKycStatus], [IsDeleted], [CreatedAt])
VALUES
    (1, N'Nguyễn Văn Admin',   'admin@prosport.vn',    '$2a$12$LJ3m4ys3Gg4vPwYOkTQJaeKzGHoFbGUGBuEA8GRf5qZ5.F3DXWW6', '0901000001', 'Admin',    'Verified',   0, SYSDATETIME()),
    (2, N'Trần Thị Staff',     'staff@prosport.vn',    '$2a$12$LJ3m4ys3Gg4vPwYOkTQJaeKzGHoFbGUGBuEA8GRf5qZ5.F3DXWW6', '0901000002', 'Staff',    'Verified',   0, SYSDATETIME()),
    (3, N'Lê Minh Customer',   'customer@prosport.vn', '$2a$12$LJ3m4ys3Gg4vPwYOkTQJaeKzGHoFbGUGBuEA8GRf5qZ5.F3DXWW6', '0901000003', 'Customer', 'Verified',   0, SYSDATETIME());

SET IDENTITY_INSERT [dbo].[Users] OFF;
GO

-- ============================================================================
-- 2. ESCROW WALLETS — Ví ký quỹ tương ứng cho từng User
-- ============================================================================

SET IDENTITY_INSERT [dbo].[EscrowWallets] ON;

INSERT INTO [dbo].[EscrowWallets] ([WalletId], [UserId], [Balance], [FrozenAmount], [CreatedAt])
VALUES
    (1, 1,       0.00, 0.00, SYSDATETIME()),   -- Admin  (ví trống)
    (2, 2,       0.00, 0.00, SYSDATETIME()),   -- Staff  (ví trống)
    (3, 3, 500000.00, 0.00, SYSDATETIME());    -- Customer (nạp sẵn 500K VND để test)

SET IDENTITY_INSERT [dbo].[EscrowWallets] OFF;
GO

-- ============================================================================
-- 3. COURTS — 4 sân mẫu (2 Badminton, 2 Pickleball)
-- ============================================================================

SET IDENTITY_INSERT [dbo].[Courts] ON;

INSERT INTO [dbo].[Courts] ([CourtId], [CourtName], [SportType], [Description], [Status], [IsDeleted], [CreatedAt])
VALUES
    (1, N'Sân Cầu Lông A1',  'Badminton',  N'Sân cầu lông trong nhà, mặt sàn gỗ cao cấp, đèn LED chống chói.',  'Active', 0, SYSDATETIME()),
    (2, N'Sân Cầu Lông A2',  'Badminton',  N'Sân cầu lông trong nhà, mặt sàn thảm PVC, quạt thông gió.',        'Active', 0, SYSDATETIME()),
    (3, N'Sân Pickleball B1', 'Pickleball', N'Sân pickleball tiêu chuẩn USA, mặt sàn acrylic, có mái che.',       'Active', 0, SYSDATETIME()),
    (4, N'Sân Pickleball B2', 'Pickleball', N'Sân pickleball ngoài trời, có hệ thống đèn chiếu sáng ban đêm.',   'Active', 0, SYSDATETIME());

SET IDENTITY_INSERT [dbo].[Courts] OFF;
GO

-- ============================================================================
-- 4. TIMESLOTS — 17 khung giờ hoạt động (06:00 → 23:00, mỗi slot 1 giờ)
-- ============================================================================

SET IDENTITY_INSERT [dbo].[TimeSlots] ON;

INSERT INTO [dbo].[TimeSlots] ([SlotId], [StartTime], [EndTime], [SlotLabel])
VALUES
    ( 1, '06:00', '07:00', N'Sáng sớm'),
    ( 2, '07:00', '08:00', N'Sáng sớm'),
    ( 3, '08:00', '09:00', N'Sáng'),
    ( 4, '09:00', '10:00', N'Sáng'),
    ( 5, '10:00', '11:00', N'Sáng'),
    ( 6, '11:00', '12:00', N'Trưa'),
    ( 7, '12:00', '13:00', N'Trưa'),
    ( 8, '13:00', '14:00', N'Chiều'),
    ( 9, '14:00', '15:00', N'Chiều'),
    (10, '15:00', '16:00', N'Chiều'),
    (11, '16:00', '17:00', N'Chiều cao điểm'),
    (12, '17:00', '18:00', N'Chiều cao điểm'),
    (13, '18:00', '19:00', N'Tối cao điểm'),
    (14, '19:00', '20:00', N'Tối cao điểm'),
    (15, '20:00', '21:00', N'Tối'),
    (16, '21:00', '22:00', N'Tối'),
    (17, '22:00', '23:00', N'Khuya');

SET IDENTITY_INSERT [dbo].[TimeSlots] OFF;
GO

-- ============================================================================
-- 5. PRICEMATRIX — Ma trận giá cho tất cả tổ hợp Sân × Slot × DayType
-- ============================================================================
-- Bảng giá mẫu (VND):
--   Badminton  | Weekday giờ thường: 80,000  | Weekday cao điểm: 120,000
--              | Weekend giờ thường: 100,000 | Weekend cao điểm: 150,000
--   Pickleball | Weekday giờ thường: 100,000 | Weekday cao điểm: 150,000
--              | Weekend giờ thường: 130,000 | Weekend cao điểm: 180,000
-- Cao điểm = SlotId 11-14 (16:00 → 20:00)

-- Badminton Courts (CourtId 1, 2) — Weekday
INSERT INTO [dbo].[PriceMatrix] ([CourtId], [SlotId], [DayType], [Price])
SELECT c.CourtId, ts.SlotId, 'Weekday',
    CASE
        WHEN ts.SlotId BETWEEN 11 AND 14 THEN 120000.00   -- Cao điểm
        ELSE 80000.00                                       -- Giờ thường
    END
FROM [dbo].[Courts] c
CROSS JOIN [dbo].[TimeSlots] ts
WHERE c.SportType = 'Badminton';

-- Badminton Courts (CourtId 1, 2) — Weekend
INSERT INTO [dbo].[PriceMatrix] ([CourtId], [SlotId], [DayType], [Price])
SELECT c.CourtId, ts.SlotId, 'Weekend',
    CASE
        WHEN ts.SlotId BETWEEN 11 AND 14 THEN 150000.00   -- Cao điểm
        ELSE 100000.00                                      -- Giờ thường
    END
FROM [dbo].[Courts] c
CROSS JOIN [dbo].[TimeSlots] ts
WHERE c.SportType = 'Badminton';

-- Pickleball Courts (CourtId 3, 4) — Weekday
INSERT INTO [dbo].[PriceMatrix] ([CourtId], [SlotId], [DayType], [Price])
SELECT c.CourtId, ts.SlotId, 'Weekday',
    CASE
        WHEN ts.SlotId BETWEEN 11 AND 14 THEN 150000.00   -- Cao điểm
        ELSE 100000.00                                      -- Giờ thường
    END
FROM [dbo].[Courts] c
CROSS JOIN [dbo].[TimeSlots] ts
WHERE c.SportType = 'Pickleball';

-- Pickleball Courts (CourtId 3, 4) — Weekend
INSERT INTO [dbo].[PriceMatrix] ([CourtId], [SlotId], [DayType], [Price])
SELECT c.CourtId, ts.SlotId, 'Weekend',
    CASE
        WHEN ts.SlotId BETWEEN 11 AND 14 THEN 180000.00   -- Cao điểm
        ELSE 130000.00                                      -- Giờ thường
    END
FROM [dbo].[Courts] c
CROSS JOIN [dbo].[TimeSlots] ts
WHERE c.SportType = 'Pickleball';
GO

-- ============================================================================
-- 6. EQUIPMENTS — 4 loại vợt cho thuê (2 cầu lông, 2 pickleball)
-- RentalPrice tự động tính = 5% RetailPrice (computed column)
-- HAI KHO TÁCH BIỆT:
--   RentalStock = số cây cho thuê (chi tiết ở bảng EquipmentUnits)
--   SalesStock  = số cây MỚI nguyên hộp để bán cho khách muốn mua đứt
-- ============================================================================

SET IDENTITY_INSERT [dbo].[Equipments] ON;

INSERT INTO [dbo].[Equipments] ([EquipmentId], [EquipmentName], [SportType], [RetailPrice], [RentalStock], [SalesStock], [Description], [IsDeleted], [CreatedAt])
VALUES
    --                                                          RetailPrice  Rental Sales
    (1, N'Vợt Cầu Lông Yonex Astrox 88D',     'Badminton',   600000.00,   3,     5,  N'Vợt tấn công nặng đầu, dây BG65, thích hợp cho người chơi trung bình - nâng cao.', 0, SYSDATETIME()),
    (2, N'Vợt Cầu Lông Lining Windstorm 72',   'Badminton',   400000.00,   3,     8,  N'Vợt nhẹ siêu tốc, phù hợp người mới bắt đầu, dây số 66.',                         0, SYSDATETIME()),
    (3, N'Vợt Pickleball Selkirk AMPED Epic',   'Pickleball',  700000.00,   3,     4,  N'Vợt polymer core, bề mặt FiberFlex, cân bằng giữa power và control.',             0, SYSDATETIME()),
    (4, N'Vợt Pickleball HEAD Radical Elite',    'Pickleball',  500000.00,   3,     6,  N'Vợt composite nhẹ, grip êm tay, thích hợp cho người mới chơi pickleball.',        0, SYSDATETIME());
-- RentalPrice tự tính: 30000, 20000, 35000, 25000 (VND/ngày)

SET IDENTITY_INSERT [dbo].[Equipments] OFF;
GO

-- ============================================================================
-- 7. EQUIPMENT UNITS — Từng cây vợt vật lý (mỗi mẫu 3-4 cây để test)
-- SerialNumber format: {SportType viết tắt}-{Model viết tắt}-{Số thứ tự}
-- Mặc định: RentalCount = 0, Status = 'Available'
-- ============================================================================

SET IDENTITY_INSERT [dbo].[EquipmentUnits] ON;

INSERT INTO [dbo].[EquipmentUnits] ([UnitId], [EquipmentId], [SerialNumber], [RentalCount], [Status], [Condition], [CreatedAt])
VALUES
    -- Yonex Astrox 88D (EquipmentId = 1) — 3 cây
    ( 1, 1, 'BD-YA88D-001',  0, 'Available', N'Mới 100%',    SYSDATETIME()),
    ( 2, 1, 'BD-YA88D-002',  5, 'Available', N'Tốt',         SYSDATETIME()),
    ( 3, 1, 'BD-YA88D-003', 18, 'Available', N'Khung còn tốt, dây hơi mỏi', SYSDATETIME()),

    -- Lining Windstorm 72 (EquipmentId = 2) — 3 cây
    ( 4, 2, 'BD-LW72-001',   0, 'Available', N'Mới 100%',    SYSDATETIME()),
    ( 5, 2, 'BD-LW72-002',  12, 'Available', N'Tốt',         SYSDATETIME()),
    ( 6, 2, 'BD-LW72-003',  20, 'Liquidated', N'Đã thuê đủ 20 lần, chuyển kho thanh lý', SYSDATETIME()),

    ( 7, 3, 'PB-SAE-001',    0, 'Available', N'Mới 100%',    SYSDATETIME()),
    ( 8, 3, 'PB-SAE-002',    8, 'Available', N'Tốt',         SYSDATETIME()),
    ( 9, 3, 'PB-SAE-003',    3, 'Rented',    N'Tốt, đang cho thuê', SYSDATETIME()),
    (10, 4, 'PB-HRE-001',    0, 'Available', N'Mới 100%',    SYSDATETIME()),
    (11, 4, 'PB-HRE-002',   15, 'Available', N'Khung còn tốt', SYSDATETIME()),
    (12, 4, 'PB-HRE-003',    1, 'Available', N'Như mới',     SYSDATETIME());

UPDATE [dbo].[EquipmentUnits]
SET [LiquidationPrice] = 160000.00
WHERE [UnitId] = 6;

SET IDENTITY_INSERT [dbo].[EquipmentUnits] OFF;
GO

-- ============================================================================
-- 8. KIỂM TRA TỔNG KẾT DỮ LIỆU ĐÃ CHÈN
-- ============================================================================

PRINT N'';
PRINT N'╔════════════════════════════════════════════════════════╗';
PRINT N'║       ✅ SEED DATA ĐÃ ĐƯỢC CHÈN THÀNH CÔNG!           ║';
PRINT N'╚════════════════════════════════════════════════════════╝';
PRINT N'';

SELECT 'Users'                      AS [Table], COUNT(*) AS [Rows] FROM [dbo].[Users]
UNION ALL
SELECT 'EscrowWallets',                         COUNT(*)           FROM [dbo].[EscrowWallets]
UNION ALL
SELECT 'Courts',                                COUNT(*)           FROM [dbo].[Courts]
UNION ALL
SELECT 'TimeSlots',                             COUNT(*)           FROM [dbo].[TimeSlots]
UNION ALL
SELECT 'PriceMatrix',                           COUNT(*)           FROM [dbo].[PriceMatrix]
UNION ALL
SELECT 'Equipments',                            COUNT(*)           FROM [dbo].[Equipments]
UNION ALL
SELECT 'EquipmentUnits',                        COUNT(*)           FROM [dbo].[EquipmentUnits]
UNION ALL
SELECT 'Bookings',                              COUNT(*)           FROM [dbo].[Bookings]
UNION ALL
SELECT 'BookingDetails_Equipments',             COUNT(*)           FROM [dbo].[BookingDetails_Equipments]
UNION ALL
SELECT 'Vouchers',                              COUNT(*)           FROM [dbo].[Vouchers]
UNION ALL
SELECT 'Payments',                              COUNT(*)           FROM [dbo].[Payments]
UNION ALL
SELECT 'Matches',                               COUNT(*)           FROM [dbo].[Matches]
UNION ALL
SELECT 'MatchMembers',                          COUNT(*)           FROM [dbo].[MatchMembers]
UNION ALL
SELECT 'EscrowTransactions',                    COUNT(*)           FROM [dbo].[EscrowTransactions]
ORDER BY [Table];
GO

-- ============================================================================
-- 9. KIỂM TRA MÔ HÌNH TRY-BEFORE-YOU-BUY
-- ============================================================================

PRINT N'';
PRINT N'💰 [Bảng giá vợt: RetailPrice → RentalPrice = 5%]';
SELECT 
    [EquipmentId],
    [EquipmentName],
    [RetailPrice],
    [RentalPrice],
    CONCAT(CAST(([RentalPrice] * 100.0 / [RetailPrice]) AS DECIMAL(5,1)), '%') AS [RentalPercent]
FROM [dbo].[Equipments];

PRINT N'';
PRINT N'📦 [Kho vợt vật lý: Từng cây vợt và số lần thuê]';
SELECT 
    eu.[UnitId],
    e.[EquipmentName],
    eu.[SerialNumber],
    eu.[RentalCount],
    eu.[Status],
    eu.[LiquidationPrice],
    eu.[Condition]
FROM [dbo].[EquipmentUnits] eu
INNER JOIN [dbo].[Equipments] e ON eu.[EquipmentId] = e.[EquipmentId]
ORDER BY eu.[EquipmentId], eu.[UnitId];
GO
