-- ============================================================================
-- PRO-SPORT COMPLEX — Database Migration Script (Fixes)
-- Target: Microsoft SQL Server 2019+
-- Encoding: UTF-8
-- Description: Kh?c ph?c 5 l?i nghiêm tr?ng và r?i ro m? r?ng trong Schema
-- ============================================================================

USE [ProSportDB];
GO

-- ============================================================================
-- 1. L?i logic chu?n hóa trong BookingDetails_Equipments
-- V?n ??: Xóa Khóa ngo?i FK_BookingDetailsEquip_Units và c?t UnitId.
-- ============================================================================
-- Xóa khóa ngo?i n?u t?n t?i
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_BookingDetailsEquip_Units')
BEGIN
    ALTER TABLE [dbo].[BookingDetails_Equipments] DROP CONSTRAINT [FK_BookingDetailsEquip_Units];
    PRINT N'?ã xóa khóa ngo?i FK_BookingDetailsEquip_Units.';
END
GO

-- Xóa c?t UnitId n?u t?n t?i
IF COL_LENGTH('dbo.BookingDetails_Equipments', 'UnitId') IS NOT NULL
BEGIN
    ALTER TABLE [dbo].[BookingDetails_Equipments] DROP COLUMN [UnitId];
    PRINT N'?ã xóa c?t UnitId kh?i b?ng BookingDetails_Equipments.';
END
GO

-- ============================================================================
-- 2. L?i Deadlock chi?m d?ng sân v?nh vi?n trong Bookings
-- V?n ??: Thêm c?t PaymentExpiredAt (DATETIME2, cho phép NULL) ?? x? lý timeout.
-- ============================================================================
IF COL_LENGTH('dbo.Bookings', 'PaymentExpiredAt') IS NULL
BEGIN
    ALTER TABLE [dbo].[Bookings] ADD [PaymentExpiredAt] DATETIME2(7) NULL;
    PRINT N'?ã thêm c?t PaymentExpiredAt vào b?ng Bookings.';
END
GO

-- ============================================================================
-- 3. R?i ro thi?u minh b?ch dòng ti?n hóa ??n trong Bookings
-- V?n ??: Thêm c?t SubTotal và DiscountAmount (DECIMAL 18,2, m?c ??nh 0).
-- ============================================================================
IF COL_LENGTH('dbo.Bookings', 'SubTotal') IS NULL
BEGIN
    ALTER TABLE [dbo].[Bookings] 
    ADD [SubTotal] DECIMAL(18,2) NOT NULL 
    CONSTRAINT [DF_Bookings_SubTotal] DEFAULT (0);
    PRINT N'?ã thêm c?t SubTotal vào b?ng Bookings.';
END
GO

IF COL_LENGTH('dbo.Bookings', 'DiscountAmount') IS NULL
BEGIN
    ALTER TABLE [dbo].[Bookings] 
    ADD [DiscountAmount] DECIMAL(18,2) NOT NULL 
    CONSTRAINT [DF_Bookings_DiscountAmount] DEFAULT (0);
    PRINT N'?ã thêm c?t DiscountAmount vào b?ng Bookings.';
END
GO

-- ============================================================================
-- 4. L?i m?t d?u dòng ti?n ký qu? trong MatchMembers
-- V?n ??: Thêm c?t LockedAmount (DECIMAL 18,2, NOT NULL, DEFAULT 0) và constraint CHECK >= 0.
-- ============================================================================
IF COL_LENGTH('dbo.MatchMembers', 'LockedAmount') IS NULL
BEGIN
    ALTER TABLE [dbo].[MatchMembers] 
    ADD [LockedAmount] DECIMAL(18,2) NOT NULL 
        CONSTRAINT [DF_MatchMembers_LockedAmount] DEFAULT (0)
        CONSTRAINT [CK_MatchMembers_LockedAmount] CHECK ([LockedAmount] >= 0);
    
    PRINT N'?ã thêm c?t LockedAmount và constraint CK_MatchMembers_LockedAmount vào b?ng MatchMembers.';
END
GO

-- ============================================================================
-- 5. Thi?u lo?i ngày L?/T?t trong PriceMatrix
-- V?n ??: Thay th? constraint CK_PriceMatrix_DayType ?? cho phép ('Weekday', 'Weekend', 'Holiday').
-- ============================================================================
-- Xóa constraint c? n?u t?n t?i
IF EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_PriceMatrix_DayType')
BEGIN
    ALTER TABLE [dbo].[PriceMatrix] DROP CONSTRAINT [CK_PriceMatrix_DayType];
    PRINT N'?ã xóa constraint CK_PriceMatrix_DayType c?.';
END
GO

-- T?o l?i constraint m?i
IF NOT EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_PriceMatrix_DayType')
BEGIN
    ALTER TABLE [dbo].[PriceMatrix] 
    ADD CONSTRAINT [CK_PriceMatrix_DayType] CHECK ([DayType] IN ('Weekday', 'Weekend', 'Holiday'));
    PRINT N'?ã t?o m?i constraint CK_PriceMatrix_DayType (bao g?m Holiday).';
END
GO

PRINT N'? ?ã ch?y thành công Migration Script kh?c ph?c 5 v?n ?? Schema.';
GO
