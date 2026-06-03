-- ============================================================================
-- PRO-SPORT COMPLEX — Seed Data Script
-- Target: Microsoft SQL Server 2019+
-- Prerequisite: Ch?y file ProSportDB_Schema.sql tr??c khi ch?y file này.
-- Author: Senior Database Engineer (AI-Assisted)
-- Date: 2026-05-26
-- ============================================================================
-- H??NG D?N: Ch?y file này trên SSMS sau khi ?ã t?o xong Schema.
-- Script s? chèn d? li?u m?u ?? test API.
-- ============================================================================

USE [ProSportDB];
GO

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO


-- ============================================================================
-- 1. USERS — 3 tài kho?n m?u (Admin, Staff, Customer)
-- ============================================================================
-- L?u ý: PasswordHash d??i ?ây là BCrypt hash c?a chu?i "Password@123"
-- Trong môi tr??ng production, ph?i hash b?ng BCrypt ? t?ng Application.

SET IDENTITY_INSERT [dbo].[Users] ON;

INSERT INTO [dbo].[Users] ([UserId], [FullName], [Email], [PasswordHash], [PhoneNumber], [Role], [EKycStatus], [IsDeleted], [CreatedAt])
VALUES
    (1, N'Nguy?n V?n Admin',   'admin@prosport.vn',    '$2a$12$LJ3m4ys3Gg4vPwYOkTQJaeKzGHoFbGUGBuEA8GRf5qZ5.F3DXWW6', '0901000001', 'Admin',    'Verified',   0, SYSDATETIME()),
    (2, N'Tr?n Th? Staff',     'staff@prosport.vn',    '$2a$12$LJ3m4ys3Gg4vPwYOkTQJaeKzGHoFbGUGBuEA8GRf5qZ5.F3DXWW6', '0901000002', 'Staff',    'Verified',   0, SYSDATETIME()),
    (3, N'Lê Minh Customer',   'customer@prosport.vn', '$2a$12$LJ3m4ys3Gg4vPwYOkTQJaeKzGHoFbGUGBuEA8GRf5qZ5.F3DXWW6', '0901000003', 'Customer', 'Verified',   0, SYSDATETIME());

SET IDENTITY_INSERT [dbo].[Users] OFF;
GO

-- ============================================================================
-- 2. ESCROW WALLETS — Ví ký qu? t??ng ?ng cho t?ng User
-- ============================================================================

SET IDENTITY_INSERT [dbo].[EscrowWallets] ON;

INSERT INTO [dbo].[EscrowWallets] ([WalletId], [UserId], [Balance], [FrozenAmount], [CreatedAt])
VALUES
    (1, 1,       0.00, 0.00, SYSDATETIME()),   -- Admin  (ví tr?ng)
    (2, 2,       0.00, 0.00, SYSDATETIME()),   -- Staff  (ví tr?ng)
    (3, 3, 500000.00, 0.00, SYSDATETIME());    -- Customer (n?p s?n 500K VND ?? test)

SET IDENTITY_INSERT [dbo].[EscrowWallets] OFF;
GO

-- ============================================================================
-- 3. COURTS — 4 sân m?u (2 Badminton, 2 Pickleball)
-- ============================================================================

SET IDENTITY_INSERT [dbo].[Courts] ON;

INSERT INTO [dbo].[Courts] ([CourtId], [CourtName], [SportType], [Description], [Status], [IsDeleted], [CreatedAt])
VALUES
    (1, N'Sân C?u Lông A1',  'Badminton',  N'Sân c?u lông trong nhà, m?t sàn g? cao c?p, ?èn LED ch?ng chói.',  'Active', 0, SYSDATETIME()),
    (2, N'Sân C?u Lông A2',  'Badminton',  N'Sân c?u lông trong nhà, m?t sàn th?m PVC, qu?t thông gió.',        'Active', 0, SYSDATETIME()),
    (3, N'Sân Pickleball B1', 'Pickleball', N'Sân pickleball tiêu chu?n USA, m?t sàn acrylic, có mái che.',       'Active', 0, SYSDATETIME()),
    (4, N'Sân Pickleball B2', 'Pickleball', N'Sân pickleball ngoài tr?i, có h? th?ng ?èn chi?u sáng ban ?êm.',   'Active', 0, SYSDATETIME());

SET IDENTITY_INSERT [dbo].[Courts] OFF;
GO

-- ============================================================================
-- 4. TIMESLOTS — 17 khung gi? ho?t ??ng (06:00 ? 23:00, m?i slot 1 gi?)
-- ============================================================================

SET IDENTITY_INSERT [dbo].[TimeSlots] ON;

INSERT INTO [dbo].[TimeSlots] ([SlotId], [StartTime], [EndTime], [SlotLabel])
VALUES
    ( 1, '06:00', '07:00', N'Sáng s?m'),
    ( 2, '07:00', '08:00', N'Sáng s?m'),
    ( 3, '08:00', '09:00', N'Sáng'),
    ( 4, '09:00', '10:00', N'Sáng'),
    ( 5, '10:00', '11:00', N'Sáng'),
    ( 6, '11:00', '12:00', N'Tr?a'),
    ( 7, '12:00', '13:00', N'Tr?a'),
    ( 8, '13:00', '14:00', N'Chi?u'),
    ( 9, '14:00', '15:00', N'Chi?u'),
    (10, '15:00', '16:00', N'Chi?u'),
    (11, '16:00', '17:00', N'Chi?u cao ?i?m'),
    (12, '17:00', '18:00', N'Chi?u cao ?i?m'),
    (13, '18:00', '19:00', N'T?i cao ?i?m'),
    (14, '19:00', '20:00', N'T?i cao ?i?m'),
    (15, '20:00', '21:00', N'T?i'),
    (16, '21:00', '22:00', N'T?i'),
    (17, '22:00', '23:00', N'Khuya');

SET IDENTITY_INSERT [dbo].[TimeSlots] OFF;
GO

-- ============================================================================
-- 5. PRICEMATRIX — Ma tr?n giá cho t?t c? t? h?p Sân × Slot × DayType
-- ============================================================================
-- B?ng giá m?u (VND):
--   Badminton  | Weekday gi? th??ng: 80,000  | Weekday cao ?i?m: 120,000
--              | Weekend gi? th??ng: 100,000 | Weekend cao ?i?m: 150,000
--   Pickleball | Weekday gi? th??ng: 100,000 | Weekday cao ?i?m: 150,000
--              | Weekend gi? th??ng: 130,000 | Weekend cao ?i?m: 180,000
-- Cao ?i?m = SlotId 11-14 (16:00 ? 20:00)

-- Badminton Courts (CourtId 1, 2) — Weekday
INSERT INTO [dbo].[PriceMatrix] ([CourtId], [SlotId], [DayType], [Price])
SELECT c.CourtId, ts.SlotId, 'Weekday',
    CASE
        WHEN ts.SlotId BETWEEN 11 AND 14 THEN 120000.00   -- Cao ?i?m
        ELSE 80000.00                                       -- Gi? th??ng
    END
FROM [dbo].[Courts] c
CROSS JOIN [dbo].[TimeSlots] ts
WHERE c.SportType = 'Badminton';

-- Badminton Courts (CourtId 1, 2) — Weekend
INSERT INTO [dbo].[PriceMatrix] ([CourtId], [SlotId], [DayType], [Price])
SELECT c.CourtId, ts.SlotId, 'Weekend',
    CASE
        WHEN ts.SlotId BETWEEN 11 AND 14 THEN 150000.00   -- Cao ?i?m
        ELSE 100000.00                                      -- Gi? th??ng
    END
FROM [dbo].[Courts] c
CROSS JOIN [dbo].[TimeSlots] ts
WHERE c.SportType = 'Badminton';

-- Pickleball Courts (CourtId 3, 4) — Weekday
INSERT INTO [dbo].[PriceMatrix] ([CourtId], [SlotId], [DayType], [Price])
SELECT c.CourtId, ts.SlotId, 'Weekday',
    CASE
        WHEN ts.SlotId BETWEEN 11 AND 14 THEN 150000.00   -- Cao ?i?m
        ELSE 100000.00                                      -- Gi? th??ng
    END
FROM [dbo].[Courts] c
CROSS JOIN [dbo].[TimeSlots] ts
WHERE c.SportType = 'Pickleball';

-- Pickleball Courts (CourtId 3, 4) — Weekend
INSERT INTO [dbo].[PriceMatrix] ([CourtId], [SlotId], [DayType], [Price])
SELECT c.CourtId, ts.SlotId, 'Weekend',
    CASE
        WHEN ts.SlotId BETWEEN 11 AND 14 THEN 180000.00   -- Cao ?i?m
        ELSE 130000.00                                      -- Gi? th??ng
    END
FROM [dbo].[Courts] c
CROSS JOIN [dbo].[TimeSlots] ts
WHERE c.SportType = 'Pickleball';
GO

-- ============================================================================
-- 6. EQUIPMENTS — 4 lo?i v?t cho thuê (2 c?u lông, 2 pickleball)
-- RentalPrice t? ??ng tính = 5% RetailPrice (computed column)
-- HAI KHO TÁCH BI?T:
--   RentalStock = s? cây cho thuê (chi ti?t ? b?ng EquipmentUnits)
--   SalesStock  = s? cây M?I nguyên h?p ?? bán cho khách mu?n mua ??t
-- ============================================================================

SET IDENTITY_INSERT [dbo].[Equipments] ON;

INSERT INTO [dbo].[Equipments] ([EquipmentId], [EquipmentName], [SportType], [RetailPrice], [RentalStock], [SalesStock], [Description], [IsDeleted], [CreatedAt])
VALUES
    --                                                          RetailPrice  Rental Sales
    (1, N'V?t C?u Lông Yonex Astrox 88D',     'Badminton',   600000.00,   3,     5,  N'V?t t?n công n?ng ??u, dây BG65, thích h?p cho ng??i ch?i trung bình - nâng cao.', 0, SYSDATETIME()),
    (2, N'V?t C?u Lông Lining Windstorm 72',   'Badminton',   400000.00,   3,     8,  N'V?t nh? siêu t?c, phù h?p ng??i m?i b?t ??u, dây s? 66.',                         0, SYSDATETIME()),
    (3, N'V?t Pickleball Selkirk AMPED Epic',   'Pickleball',  700000.00,   3,     4,  N'V?t polymer core, b? m?t FiberFlex, cân b?ng gi?a power và control.',             0, SYSDATETIME()),
    (4, N'V?t Pickleball HEAD Radical Elite',    'Pickleball',  500000.00,   3,     6,  N'V?t composite nh?, grip êm tay, thích h?p cho ng??i m?i ch?i pickleball.',        0, SYSDATETIME());
-- RentalPrice t? tính: 30000, 20000, 35000, 25000 (VND/ngày)

SET IDENTITY_INSERT [dbo].[Equipments] OFF;
GO

-- ============================================================================
-- 7. EQUIPMENT UNITS — T?ng cây v?t v?t lý (m?i m?u 3-4 cây ?? test)
-- SerialNumber format: {SportType vi?t t?t}-{Model vi?t t?t}-{S? th? t?}
-- M?c ??nh: RentalCount = 0, Status = 'Available'
-- ============================================================================

SET IDENTITY_INSERT [dbo].[EquipmentUnits] ON;

INSERT INTO [dbo].[EquipmentUnits] ([UnitId], [EquipmentId], [SerialNumber], [RentalCount], [Status], [Condition], [CreatedAt])
VALUES
    -- Yonex Astrox 88D (EquipmentId = 1) — 3 cây
    ( 1, 1, 'BD-YA88D-001',  0, 'Available', N'M?i 100%',    SYSDATETIME()),
    ( 2, 1, 'BD-YA88D-002',  5, 'Available', N'T?t',         SYSDATETIME()),
    ( 3, 1, 'BD-YA88D-003', 18, 'Available', N'Khung còn t?t, dây h?i m?i', SYSDATETIME()),

    -- Lining Windstorm 72 (EquipmentId = 2) — 3 cây
    ( 4, 2, 'BD-LW72-001',   0, 'Available', N'M?i 100%',    SYSDATETIME()),
    ( 5, 2, 'BD-LW72-002',  12, 'Available', N'T?t',         SYSDATETIME()),
    ( 6, 2, 'BD-LW72-003',  20, 'Liquidated', N'?ã thuê ?? 20 l?n, chuy?n kho thanh lý', SYSDATETIME()),

    ( 7, 3, 'PB-SAE-001',    0, 'Available', N'M?i 100%',    SYSDATETIME()),
    ( 8, 3, 'PB-SAE-002',    8, 'Available', N'T?t',         SYSDATETIME()),
    ( 9, 3, 'PB-SAE-003',    3, 'Rented',    N'T?t, ?ang cho thuê', SYSDATETIME()),
    (10, 4, 'PB-HRE-001',    0, 'Available', N'M?i 100%',    SYSDATETIME()),
    (11, 4, 'PB-HRE-002',   15, 'Available', N'Khung còn t?t', SYSDATETIME()),
    (12, 4, 'PB-HRE-003',    1, 'Available', N'Nh? m?i',     SYSDATETIME());

UPDATE [dbo].[EquipmentUnits]
SET [LiquidationPrice] = 160000.00
WHERE [UnitId] = 6;

SET IDENTITY_INSERT [dbo].[EquipmentUnits] OFF;
GO

-- ============================================================================
-- 8. KI?M TRA T?NG K?T D? LI?U ?Ã CHÈN
-- ============================================================================

PRINT N'';
PRINT N'??????????????????????????????????????????????????????????';
PRINT N'?       ? SEED DATA ?Ã ???C CHÈN THÀNH CÔNG!           ?';
PRINT N'??????????????????????????????????????????????????????????';
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
-- 9. KI?M TRA MÔ HÌNH TRY-BEFORE-YOU-BUY
-- ============================================================================

PRINT N'';
PRINT N'?? [B?ng giá v?t: RetailPrice ? RentalPrice = 5%]';
SELECT 
    [EquipmentId],
    [EquipmentName],
    [RetailPrice],
    [RentalPrice],
    CONCAT(CAST(([RentalPrice] * 100.0 / [RetailPrice]) AS DECIMAL(5,1)), '%') AS [RentalPercent]
FROM [dbo].[Equipments];

PRINT N'';
PRINT N'?? [Kho v?t v?t lý: T?ng cây v?t và s? l?n thuê]';
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
