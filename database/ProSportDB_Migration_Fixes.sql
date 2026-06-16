-- ============================================================================
-- PRO-SPORT COMPLEX — Database Migration Script (Fixes)
-- Target: Microsoft SQL Server 2019+
-- Encoding: UTF-8
-- Description: Khắc phục 5 lỗi nghiêm trọng và rủi ro mở rộng trong Schema
-- ============================================================================

USE [ProSportDB];
GO

-- ============================================================================
-- 1. Lỗi logic chuẩn hóa trong BookingDetails_Equipments
-- Vấn đề: Xóa Khóa ngoại FK_BookingDetailsEquip_Units và cột UnitId.
-- ============================================================================
-- Xóa khóa ngoại nếu tồn tại
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_BookingDetailsEquip_Units')
BEGIN
    ALTER TABLE [dbo].[BookingDetails_Equipments] DROP CONSTRAINT [FK_BookingDetailsEquip_Units];
    PRINT N'Đã xóa khóa ngoại FK_BookingDetailsEquip_Units.';
END
GO

-- Xóa cột UnitId nếu tồn tại
IF COL_LENGTH('dbo.BookingDetails_Equipments', 'UnitId') IS NOT NULL
BEGIN
    ALTER TABLE [dbo].[BookingDetails_Equipments] DROP COLUMN [UnitId];
    PRINT N'Đã xóa cột UnitId khỏi bảng BookingDetails_Equipments.';
END
GO

-- ============================================================================
-- 2. Lỗi Deadlock chiếm dụng sân vĩnh viễn trong Bookings
-- Vấn đề: Thêm cột PaymentExpiredAt (DATETIME2, cho phép NULL) để xử lý timeout.
-- ============================================================================
IF COL_LENGTH('dbo.Bookings', 'PaymentExpiredAt') IS NULL
BEGIN
    ALTER TABLE [dbo].[Bookings] ADD [PaymentExpiredAt] DATETIME2(7) NULL;
    PRINT N'Đã thêm cột PaymentExpiredAt vào bảng Bookings.';
END
GO

-- ============================================================================
-- 3. Rủi ro thiếu minh bạch dòng tiền hóa đơn trong Bookings
-- Vấn đề: Thêm cột SubTotal và DiscountAmount (DECIMAL 18,2, mặc định 0).
-- ============================================================================
IF COL_LENGTH('dbo.Bookings', 'SubTotal') IS NULL
BEGIN
    ALTER TABLE [dbo].[Bookings] 
    ADD [SubTotal] DECIMAL(18,2) NOT NULL 
    CONSTRAINT [DF_Bookings_SubTotal] DEFAULT (0);
    PRINT N'Đã thêm cột SubTotal vào bảng Bookings.';
END
GO

IF COL_LENGTH('dbo.Bookings', 'DiscountAmount') IS NULL
BEGIN
    ALTER TABLE [dbo].[Bookings] 
    ADD [DiscountAmount] DECIMAL(18,2) NOT NULL 
    CONSTRAINT [DF_Bookings_DiscountAmount] DEFAULT (0);
    PRINT N'Đã thêm cột DiscountAmount vào bảng Bookings.';
END
GO

-- ============================================================================
-- 4. Lỗi mất dấu dòng tiền ký quỹ trong MatchMembers
-- Vấn đề: Thêm cột LockedAmount (DECIMAL 18,2, NOT NULL, DEFAULT 0) và constraint CHECK >= 0.
-- ============================================================================
IF COL_LENGTH('dbo.MatchMembers', 'LockedAmount') IS NULL
BEGIN
    ALTER TABLE [dbo].[MatchMembers] 
    ADD [LockedAmount] DECIMAL(18,2) NOT NULL 
        CONSTRAINT [DF_MatchMembers_LockedAmount] DEFAULT (0)
        CONSTRAINT [CK_MatchMembers_LockedAmount] CHECK ([LockedAmount] >= 0);
    
    PRINT N'Đã thêm cột LockedAmount và constraint CK_MatchMembers_LockedAmount vào bảng MatchMembers.';
END
GO

-- ============================================================================
-- 5. Thiếu loại ngày Lễ/Tết trong PriceMatrix
-- Vấn đề: Thay thế constraint CK_PriceMatrix_DayType để cho phép ('Weekday', 'Weekend', 'Holiday').
-- ============================================================================
-- Xóa constraint cũ nếu tồn tại
IF EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_PriceMatrix_DayType')
BEGIN
    ALTER TABLE [dbo].[PriceMatrix] DROP CONSTRAINT [CK_PriceMatrix_DayType];
    PRINT N'Đã xóa constraint CK_PriceMatrix_DayType cũ.';
END
GO

-- Tạo lại constraint mới
IF NOT EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_PriceMatrix_DayType')
BEGIN
    ALTER TABLE [dbo].[PriceMatrix] 
    ADD CONSTRAINT [CK_PriceMatrix_DayType] CHECK ([DayType] IN ('Weekday', 'Weekend', 'Holiday'));
    PRINT N'Đã tạo mới constraint CK_PriceMatrix_DayType (bao gồm Holiday).';
END
GO

PRINT N'✅ Đã chạy thành công Migration Script khắc phục 5 vấn đề Schema.';
GO
