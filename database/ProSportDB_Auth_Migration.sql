-- ============================================================================
-- PRO-SPORT COMPLEX — Auth Migration Script
-- Target: Microsoft SQL Server 2019+
-- Encoding: UTF-8
-- Author: Senior Database Engineer (AI-Assisted)
-- Date: 2026-05-26
-- ============================================================================
-- HƯỚNG DẪN: Chạy script này trên SSMS để cập nhật schema cho hệ thống Auth.
-- ============================================================================

USE [ProSportDB];
GO

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

-- ============================================================================
-- 1. CẬP NHẬT BẢNG Users
-- ============================================================================

-- Cho phép PasswordHash được NULL (để dùng Google Login)
ALTER TABLE [dbo].[Users] ALTER COLUMN [PasswordHash] VARCHAR(500) NULL;
GO

-- Thêm cột GoogleId và IsPhoneVerified
ALTER TABLE [dbo].[Users] ADD [GoogleId] VARCHAR(100) NULL;
ALTER TABLE [dbo].[Users] ADD [IsPhoneVerified] BIT NOT NULL CONSTRAINT [DF_Users_IsPhoneVerified] DEFAULT (0);
GO

-- Thêm Unique Index cho GoogleId (nếu khác NULL)
CREATE UNIQUE NONCLUSTERED INDEX [UQ_Users_GoogleId]
ON [dbo].[Users] ([GoogleId])
WHERE [GoogleId] IS NOT NULL;
GO

-- ============================================================================
-- 2. TẠO BẢNG OtpCodes
-- ============================================================================

CREATE TABLE [dbo].[OtpCodes]
(
    [OtpId]         INT             IDENTITY(1,1)   NOT NULL,
    [UserId]        INT             NOT NULL,
    [Code]          VARCHAR(6)      NOT NULL,
    [Type]          VARCHAR(20)     NOT NULL,
    [ExpiryTime]    DATETIME2(7)    NOT NULL,
    [IsUsed]        BIT             NOT NULL    CONSTRAINT [DF_OtpCodes_IsUsed]     DEFAULT (0),
    [CreatedAt]     DATETIME2(7)    NOT NULL    CONSTRAINT [DF_OtpCodes_CreatedAt]  DEFAULT (SYSDATETIME()),

    CONSTRAINT [PK_OtpCodes]            PRIMARY KEY CLUSTERED ([OtpId]),
    CONSTRAINT [FK_OtpCodes_Users]      FOREIGN KEY ([UserId])
                                        REFERENCES [dbo].[Users]([UserId])
                                        ON DELETE NO ACTION,
    CONSTRAINT [CK_OtpCodes_Type]       CHECK ([Type] IN ('Register', 'ResetPassword'))
);
GO

-- Index để truy vấn nhanh OTP theo UserId và Type
CREATE NONCLUSTERED INDEX [IX_OtpCodes_User_Type]
ON [dbo].[OtpCodes] ([UserId], [Type], [IsUsed], [ExpiryTime]);
GO

PRINT N'>> Auth Migration Script đã chạy thành công!';
GO
