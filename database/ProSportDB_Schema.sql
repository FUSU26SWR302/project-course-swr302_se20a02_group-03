-- ============================================================================
-- PRO-SPORT COMPLEX — Database Schema Script
-- Target: Microsoft SQL Server 2019+
-- Encoding: UTF-8 (h? tr? NVARCHAR cho ti?ng Vi?t)
-- Author: Senior Database Engineer (AI-Assisted)
-- Date: 2026-05-26
-- ============================================================================
-- H??NG D?N: Copy toàn b? script này và ch?y trên SSMS (SQL Server Management Studio).
-- Script s? t?o database ProSportDB và toàn b? 12 b?ng theo ?úng th? t? dependency.
-- ============================================================================

-- ============================================================================
-- PH?N 1: T?O DATABASE
-- ============================================================================
USE [master];
GO

-- Xóa database c? n?u t?n t?i (CH? DÙNG KHI PHÁT TRI?N)
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'ProSportDB')
BEGIN
    ALTER DATABASE [ProSportDB] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [ProSportDB];
END
GO

CREATE DATABASE [ProSportDB]
COLLATE Vietnamese_CI_AS;
GO

USE [ProSportDB];
GO

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO


-- ============================================================================
-- PH?N 2: T?O CÁC B?NG (theo th? t? dependency — b?ng cha tr??c, b?ng con sau)
-- ============================================================================

-- ????????????????????????????????????????????????????????????????????????????
-- PHÂN H? 1: QU?N LÝ TÀI KHO?N & ??NH DANH
-- ????????????????????????????????????????????????????????????????????????????

-- B?ng 1: Users — Tài kho?n ng??i dùng
CREATE TABLE [dbo].[Users]
(
    [UserId]        INT             IDENTITY(1,1)   NOT NULL,
    [FullName]      NVARCHAR(100)   NOT NULL,
    [Email]         VARCHAR(255)    NOT NULL,
    [PasswordHash]  VARCHAR(500)    NOT NULL,
    [PhoneNumber]   VARCHAR(15)     NULL,
    [Role]          VARCHAR(20)     NOT NULL,
    [EKycStatus]    VARCHAR(20)     NOT NULL    CONSTRAINT [DF_Users_EKycStatus]    DEFAULT ('Unverified'),
    [AvatarUrl]     VARCHAR(500)    NULL,
    [IsDeleted]     BIT             NOT NULL    CONSTRAINT [DF_Users_IsDeleted]     DEFAULT (0),
    [CreatedAt]     DATETIME2(7)    NOT NULL    CONSTRAINT [DF_Users_CreatedAt]     DEFAULT (SYSDATETIME()),
    [UpdatedAt]     DATETIME2(7)    NULL,

    CONSTRAINT [PK_Users]               PRIMARY KEY CLUSTERED ([UserId]),
    CONSTRAINT [UQ_Users_Email]         UNIQUE ([Email]),
    CONSTRAINT [CK_Users_Role]          CHECK ([Role] IN ('Admin', 'Staff', 'Customer')),
    CONSTRAINT [CK_Users_EKycStatus]    CHECK ([EKycStatus] IN ('Unverified', 'Pending', 'Verified', 'Rejected'))
);
GO

-- B?ng 2: EscrowWallets — Ví ký qu? (quan h? 1:1 v?i Users)
CREATE TABLE [dbo].[EscrowWallets]
(
    [WalletId]      INT             IDENTITY(1,1)   NOT NULL,
    [UserId]        INT             NOT NULL,
    [Balance]       DECIMAL(18,2)   NOT NULL    CONSTRAINT [DF_EscrowWallets_Balance]       DEFAULT (0),
    [FrozenAmount]  DECIMAL(18,2)   NOT NULL    CONSTRAINT [DF_EscrowWallets_FrozenAmount]  DEFAULT (0),
    [CreatedAt]     DATETIME2(7)    NOT NULL    CONSTRAINT [DF_EscrowWallets_CreatedAt]     DEFAULT (SYSDATETIME()),
    [UpdatedAt]     DATETIME2(7)    NULL,

    CONSTRAINT [PK_EscrowWallets]               PRIMARY KEY CLUSTERED ([WalletId]),
    CONSTRAINT [UQ_EscrowWallets_UserId]        UNIQUE ([UserId]),
    CONSTRAINT [FK_EscrowWallets_Users]         FOREIGN KEY ([UserId])
                                                REFERENCES [dbo].[Users]([UserId])
                                                ON DELETE NO ACTION,
    CONSTRAINT [CK_EscrowWallets_Balance]       CHECK ([Balance] >= 0),
    CONSTRAINT [CK_EscrowWallets_FrozenAmount]  CHECK ([FrozenAmount] >= 0)
);
GO

-- ????????????????????????????????????????????????????????????????????????????
-- PHÂN H? 2: QU?N LÝ SÂN BÃI & GIÁ ??NG
-- ????????????????????????????????????????????????????????????????????????????

-- B?ng 3: Courts — Sân bãi
CREATE TABLE [dbo].[Courts]
(
    [CourtId]       INT             IDENTITY(1,1)   NOT NULL,
    [CourtName]     NVARCHAR(100)   NOT NULL,
    [SportType]     VARCHAR(20)     NOT NULL,
    [Description]   NVARCHAR(500)   NULL,
    [ImageUrl]      VARCHAR(500)    NULL,
    [Status]        VARCHAR(20)     NOT NULL    CONSTRAINT [DF_Courts_Status]       DEFAULT ('Active'),
    [IsDeleted]     BIT             NOT NULL    CONSTRAINT [DF_Courts_IsDeleted]    DEFAULT (0),
    [CreatedAt]     DATETIME2(7)    NOT NULL    CONSTRAINT [DF_Courts_CreatedAt]    DEFAULT (SYSDATETIME()),
    [UpdatedAt]     DATETIME2(7)    NULL,

    CONSTRAINT [PK_Courts]              PRIMARY KEY CLUSTERED ([CourtId]),
    CONSTRAINT [CK_Courts_SportType]    CHECK ([SportType] IN ('Badminton', 'Pickleball')),
    CONSTRAINT [CK_Courts_Status]       CHECK ([Status] IN ('Active', 'Maintenance', 'Closed'))
);
GO

-- B?ng 4: TimeSlots — Khung gi? ho?t ??ng c? ??nh
CREATE TABLE [dbo].[TimeSlots]
(
    [SlotId]        INT             IDENTITY(1,1)   NOT NULL,
    [StartTime]     TIME(0)         NOT NULL,
    [EndTime]       TIME(0)         NOT NULL,
    [SlotLabel]     NVARCHAR(50)    NULL,

    CONSTRAINT [PK_TimeSlots]               PRIMARY KEY CLUSTERED ([SlotId]),
    CONSTRAINT [UQ_TimeSlots_StartEnd]      UNIQUE ([StartTime], [EndTime]),
    CONSTRAINT [CK_TimeSlots_EndAfterStart] CHECK ([EndTime] > [StartTime])
);
GO

-- B?ng 5: PriceMatrix — Ma tr?n giá ??ng (Sân × Khung gi? × Lo?i ngày)
CREATE TABLE [dbo].[PriceMatrix]
(
    [PriceId]       INT             IDENTITY(1,1)   NOT NULL,
    [CourtId]       INT             NOT NULL,
    [SlotId]        INT             NOT NULL,
    [DayType]       VARCHAR(10)     NOT NULL,
    [Price]         DECIMAL(18,2)   NOT NULL,

    CONSTRAINT [PK_PriceMatrix]                 PRIMARY KEY CLUSTERED ([PriceId]),
    CONSTRAINT [UQ_PriceMatrix_CourtSlotDay]    UNIQUE ([CourtId], [SlotId], [DayType]),
    CONSTRAINT [FK_PriceMatrix_Courts]          FOREIGN KEY ([CourtId])
                                                REFERENCES [dbo].[Courts]([CourtId])
                                                ON DELETE NO ACTION,
    CONSTRAINT [FK_PriceMatrix_TimeSlots]       FOREIGN KEY ([SlotId])
                                                REFERENCES [dbo].[TimeSlots]([SlotId])
                                                ON DELETE NO ACTION,
    CONSTRAINT [CK_PriceMatrix_DayType]         CHECK ([DayType] IN ('Weekday', 'Weekend')),
    CONSTRAINT [CK_PriceMatrix_Price]           CHECK ([Price] > 0)
);
GO

-- ????????????????????????????????????????????????????????????????????????????
-- PHÂN H? 3: QU?N LÝ THI?T B? & MÔ HÌNH "TRY-BEFORE-YOU-BUY"
-- ????????????????????????????????????????????????????????????????????????????
-- Mô hình: Khách thuê v?t ? th? ? thích ? MUA CÂY M?I cùng m?u (l?y t? SalesStock).
--          Cây v?t cho thuê ???c TR? L?I kho thuê, ti?p t?c cho khách khác thuê.
--          Khi 1 cây ??t 20 l?n thuê ? chuy?n sang kho thanh lý (?? c?).
-- HAI KHO TÁCH BI?T:
--   • RentalStock = s? cây v?t v?t lý dùng cho thuê (chi ti?t ? b?ng EquipmentUnits)
--   • SalesStock  = s? cây v?t M?I NGUYÊN H?P dùng ?? bán cho khách mu?n mua ??t

-- B?ng 6: Equipments — Danh m?c m?u v?t (catalog level)
-- RetailPrice = Giá bán l? g?c cây v?t m?i
-- RentalPrice = Computed column = 5% RetailPrice (giá thuê m?c ??nh/ngày)
CREATE TABLE [dbo].[Equipments]
(
    [EquipmentId]       INT             IDENTITY(1,1)   NOT NULL,
    [EquipmentName]     NVARCHAR(100)   NOT NULL,
    [SportType]         VARCHAR(20)     NOT NULL,
    [RetailPrice]       DECIMAL(18,2)   NOT NULL,
    [RentalPrice]       AS (CAST([RetailPrice] * 0.05 AS DECIMAL(18,2))) PERSISTED,
    [RentalStock]       INT             NOT NULL    CONSTRAINT [DF_Equipments_RentalStock]     DEFAULT (0),
    [SalesStock]        INT             NOT NULL    CONSTRAINT [DF_Equipments_SalesStock]      DEFAULT (0),
    [Description]       NVARCHAR(500)   NULL,
    [ImageUrl]          VARCHAR(500)    NULL,
    [IsDeleted]         BIT             NOT NULL    CONSTRAINT [DF_Equipments_IsDeleted]       DEFAULT (0),
    [CreatedAt]         DATETIME2(7)    NOT NULL    CONSTRAINT [DF_Equipments_CreatedAt]       DEFAULT (SYSDATETIME()),
    [UpdatedAt]         DATETIME2(7)    NULL,

    CONSTRAINT [PK_Equipments]              PRIMARY KEY CLUSTERED ([EquipmentId]),
    CONSTRAINT [CK_Equipments_SportType]    CHECK ([SportType] IN ('Badminton', 'Pickleball')),
    CONSTRAINT [CK_Equipments_RetailPrice]  CHECK ([RetailPrice] > 0),
    CONSTRAINT [CK_Equipments_RentalStock]  CHECK ([RentalStock] >= 0),
    CONSTRAINT [CK_Equipments_SalesStock]   CHECK ([SalesStock] >= 0)
);
GO

-- B?ng 6b: EquipmentUnits — T?ng cây v?t v?t lý trong KHO CHO THUÊ (unit level)
-- M?i b?n ghi = 1 cây v?t th?c t? dùng ?? cho thuê, ???c nhi?u khách thuê luân phiên.
-- Sau m?i l?n thuê xong ? cây v?t tr? l?i kho thuê ? RentalCount += 1.
-- Khi RentalCount >= 20 ? Application chuy?n Status ? 'Liquidated' (kho thanh lý ?? c?).
-- L?U Ý: ?ây KHÔNG ph?i v?t m?i bán cho khách. V?t bán l?y t? SalesStock c?a Equipments.
CREATE TABLE [dbo].[EquipmentUnits]
(
    [UnitId]            INT             IDENTITY(1,1)   NOT NULL,
    [EquipmentId]       INT             NOT NULL,
    [SerialNumber]      VARCHAR(50)     NOT NULL,
    [RentalCount]       INT             NOT NULL    CONSTRAINT [DF_EquipUnits_RentalCount]     DEFAULT (0),
    [Status]            VARCHAR(20)     NOT NULL    CONSTRAINT [DF_EquipUnits_Status]          DEFAULT ('Available'),
    [LiquidationPrice]  DECIMAL(18,2)   NULL,
    [Condition]         NVARCHAR(200)   NULL,
    [CreatedAt]         DATETIME2(7)    NOT NULL    CONSTRAINT [DF_EquipUnits_CreatedAt]       DEFAULT (SYSDATETIME()),
    [UpdatedAt]         DATETIME2(7)    NULL,

    CONSTRAINT [PK_EquipmentUnits]               PRIMARY KEY CLUSTERED ([UnitId]),
    CONSTRAINT [UQ_EquipmentUnits_Serial]        UNIQUE ([SerialNumber]),
    CONSTRAINT [FK_EquipmentUnits_Equipments]    FOREIGN KEY ([EquipmentId])
                                                 REFERENCES [dbo].[Equipments]([EquipmentId])
                                                 ON DELETE NO ACTION,
    CONSTRAINT [CK_EquipUnits_RentalCount]       CHECK ([RentalCount] >= 0),
    CONSTRAINT [CK_EquipUnits_Status]            CHECK ([Status] IN ('Available', 'Rented', 'Liquidated')),
    CONSTRAINT [CK_EquipUnits_LiquidationPrice]  CHECK ([LiquidationPrice] IS NULL OR [LiquidationPrice] >= 0)
);
GO

-- ????????????????????????????????????????????????????????????????????????????
-- PHÂN H? 4: LU?NG ??T SÂN & THUÊ V?T
-- ????????????????????????????????????????????????????????????????????????????

-- B?ng 7: Bookings — ??n ??t sân
CREATE TABLE [dbo].[Bookings]
(
    [BookingId]     INT             IDENTITY(1,1)   NOT NULL,
    [UserId]        INT             NOT NULL,
    [CourtId]       INT             NOT NULL,
    [SlotId]        INT             NOT NULL,
    [BookingDate]   DATE            NOT NULL,
    [TotalAmount]   DECIMAL(18,2)   NOT NULL,
    [Status]        VARCHAR(20)     NOT NULL    CONSTRAINT [DF_Bookings_Status]     DEFAULT ('Pending'),
    [QrCodeData]    VARCHAR(500)    NULL,
    [Note]          NVARCHAR(500)   NULL,
    [IsDeleted]     BIT             NOT NULL    CONSTRAINT [DF_Bookings_IsDeleted]  DEFAULT (0),
    [CreatedAt]     DATETIME2(7)    NOT NULL    CONSTRAINT [DF_Bookings_CreatedAt]  DEFAULT (SYSDATETIME()),
    [UpdatedAt]     DATETIME2(7)    NULL,

    CONSTRAINT [PK_Bookings]            PRIMARY KEY CLUSTERED ([BookingId]),
    CONSTRAINT [FK_Bookings_Users]      FOREIGN KEY ([UserId])
                                        REFERENCES [dbo].[Users]([UserId])
                                        ON DELETE NO ACTION,
    CONSTRAINT [FK_Bookings_Courts]     FOREIGN KEY ([CourtId])
                                        REFERENCES [dbo].[Courts]([CourtId])
                                        ON DELETE NO ACTION,
    CONSTRAINT [FK_Bookings_TimeSlots]  FOREIGN KEY ([SlotId])
                                        REFERENCES [dbo].[TimeSlots]([SlotId])
                                        ON DELETE NO ACTION,
    CONSTRAINT [CK_Bookings_TotalAmount]    CHECK ([TotalAmount] >= 0),
    CONSTRAINT [CK_Bookings_Status]         CHECK ([Status] IN ('Pending', 'Paid', 'Cancelled', 'Completed'))
);
GO

-- Index l?c: Ch?ng trùng l?ch ??t sân (cho phép nhi?u b?n ghi Cancelled trên cùng slot)
CREATE UNIQUE NONCLUSTERED INDEX [UX_Bookings_NoDuplicate]
ON [dbo].[Bookings] ([CourtId], [SlotId], [BookingDate])
WHERE [Status] <> 'Cancelled';
GO

-- B?ng 8: BookingDetails_Equipments — Chi ti?t thuê v?t ?i kèm Booking
CREATE TABLE [dbo].[BookingDetails_Equipments]
(
    [DetailId]      INT             IDENTITY(1,1)   NOT NULL,
    [BookingId]     INT             NOT NULL,
    [EquipmentId]   INT             NOT NULL,
    [UnitId]        INT             NULL,
    [Quantity]      INT             NOT NULL,
    [UnitPrice]     DECIMAL(18,2)   NOT NULL,
    [Subtotal]      AS ([Quantity] * [UnitPrice]) PERSISTED,

    CONSTRAINT [PK_BookingDetails_Equipments]               PRIMARY KEY CLUSTERED ([DetailId]),
    CONSTRAINT [FK_BookingDetailsEquip_Bookings]             FOREIGN KEY ([BookingId])
                                                            REFERENCES [dbo].[Bookings]([BookingId])
                                                            ON DELETE NO ACTION,
    CONSTRAINT [FK_BookingDetailsEquip_Equipments]           FOREIGN KEY ([EquipmentId])
                                                            REFERENCES [dbo].[Equipments]([EquipmentId])
                                                            ON DELETE NO ACTION,
    CONSTRAINT [FK_BookingDetailsEquip_Units]                FOREIGN KEY ([UnitId])
                                                            REFERENCES [dbo].[EquipmentUnits]([UnitId])
                                                            ON DELETE NO ACTION,
    CONSTRAINT [CK_BookingDetailsEquip_Quantity]             CHECK ([Quantity] > 0),
    CONSTRAINT [CK_BookingDetailsEquip_UnitPrice]            CHECK ([UnitPrice] >= 0)
);
GO

-- ????????????????????????????????????????????????????????????????????????????
-- PHÂN H? 4b: VOUCHER "TRY-BEFORE-YOU-BUY"
-- ????????????????????????????????????????????????????????????????????????????

-- B?ng 8b: Vouchers — Voucher kh?u tr? khi mua CÂY M?I cùng m?u ?ã thuê
-- Sinh t? ??ng khi confirm thuê v?t, giá tr? = s? ti?n thuê, hi?u l?c 24h.
-- Khi dùng voucher ? tr? giá vào RetailPrice ? l?y 1 cây M?I t? SalesStock (KHÔNG bán cây v?a thuê).
-- Cây thuê ???c tr? l?i kho cho thuê (EquipmentUnits), ti?p t?c cho khách khác thuê.
CREATE TABLE [dbo].[Vouchers]
(
    [VoucherId]         INT             IDENTITY(1,1)   NOT NULL,
    [Code]              VARCHAR(50)     NOT NULL,
    [DetailId]          INT             NOT NULL,
    [UserId]            INT             NOT NULL,
    [EquipmentId]       INT             NOT NULL,
    [DiscountAmount]    DECIMAL(18,2)   NOT NULL,
    [Status]            VARCHAR(20)     NOT NULL    CONSTRAINT [DF_Vouchers_Status]     DEFAULT ('Active'),
    [IssuedAt]          DATETIME2(7)    NOT NULL    CONSTRAINT [DF_Vouchers_IssuedAt]   DEFAULT (SYSDATETIME()),
    [ExpiresAt]         DATETIME2(7)    NOT NULL,
    [UsedAt]            DATETIME2(7)    NULL,

    CONSTRAINT [PK_Vouchers]                    PRIMARY KEY CLUSTERED ([VoucherId]),
    CONSTRAINT [UQ_Vouchers_Code]               UNIQUE ([Code]),
    CONSTRAINT [FK_Vouchers_BookingDetails]     FOREIGN KEY ([DetailId])
                                                REFERENCES [dbo].[BookingDetails_Equipments]([DetailId])
                                                ON DELETE NO ACTION,
    CONSTRAINT [FK_Vouchers_Users]              FOREIGN KEY ([UserId])
                                                REFERENCES [dbo].[Users]([UserId])
                                                ON DELETE NO ACTION,
    CONSTRAINT [FK_Vouchers_Equipments]         FOREIGN KEY ([EquipmentId])
                                                REFERENCES [dbo].[Equipments]([EquipmentId])
                                                ON DELETE NO ACTION,
    CONSTRAINT [CK_Vouchers_DiscountAmount]     CHECK ([DiscountAmount] > 0),
    CONSTRAINT [CK_Vouchers_Status]             CHECK ([Status] IN ('Active', 'Used', 'Expired')),
    CONSTRAINT [CK_Vouchers_ExpiresAfterIssued] CHECK ([ExpiresAt] > [IssuedAt])
);
GO

-- ????????????????????????????????????????????????????????????????????????????
-- PHÂN H? 5: LU?NG THANH TOÁN (VNPAY)
-- ????????????????????????????????????????????????????????????????????????????

-- B?ng 9: Payments — L?ch s? giao d?ch thanh toán
CREATE TABLE [dbo].[Payments]
(
    [PaymentId]         INT             IDENTITY(1,1)   NOT NULL,
    [BookingId]         INT             NOT NULL,
    [UserId]            INT             NOT NULL,
    [Amount]            DECIMAL(18,2)   NOT NULL,
    [PaymentMethod]     VARCHAR(20)     NOT NULL    CONSTRAINT [DF_Payments_Method]     DEFAULT ('VNPay'),
    [VnpTransactionNo]  VARCHAR(100)    NULL,
    [VnpResponseCode]   VARCHAR(10)     NULL,
    [Status]            VARCHAR(20)     NOT NULL    CONSTRAINT [DF_Payments_Status]     DEFAULT ('Pending'),
    [CreatedAt]         DATETIME2(7)    NOT NULL    CONSTRAINT [DF_Payments_CreatedAt]  DEFAULT (SYSDATETIME()),

    CONSTRAINT [PK_Payments]                PRIMARY KEY CLUSTERED ([PaymentId]),
    CONSTRAINT [FK_Payments_Bookings]       FOREIGN KEY ([BookingId])
                                            REFERENCES [dbo].[Bookings]([BookingId])
                                            ON DELETE NO ACTION,
    CONSTRAINT [FK_Payments_Users]          FOREIGN KEY ([UserId])
                                            REFERENCES [dbo].[Users]([UserId])
                                            ON DELETE NO ACTION,
    CONSTRAINT [CK_Payments_Amount]         CHECK ([Amount] > 0),
    CONSTRAINT [CK_Payments_Status]         CHECK ([Status] IN ('Pending', 'Success', 'Failed', 'Refunded'))
);
GO

-- ????????????????????????????????????????????????????????????????????????????
-- PHÂN H? 6: LU?NG CÁP KÈO & KÝ QU? (MATCHMAKING & ESCROW)
-- ????????????????????????????????????????????????????????????????????????????

-- B?ng 10: Matches — Bài ??ng cáp kèo / giao l?u
CREATE TABLE [dbo].[Matches]
(
    [MatchId]                   INT             IDENTITY(1,1)   NOT NULL,
    [HostUserId]                INT             NOT NULL,
    [CourtId]                   INT             NOT NULL,
    [SportType]                 VARCHAR(20)     NOT NULL,
    [Title]                     NVARCHAR(200)   NOT NULL,
    [Description]               NVARCHAR(1000)  NULL,
    [MatchDate]                 DATE            NOT NULL,
    [StartTime]                 TIME(0)         NOT NULL,
    [EndTime]                   TIME(0)         NOT NULL,
    [MaxMembers]                INT             NOT NULL,
    [EscrowAmountPerPerson]     DECIMAL(18,2)   NOT NULL    CONSTRAINT [DF_Matches_EscrowAmount]   DEFAULT (0),
    [Status]                    VARCHAR(20)     NOT NULL    CONSTRAINT [DF_Matches_Status]          DEFAULT ('Open'),
    [CreatedAt]                 DATETIME2(7)    NOT NULL    CONSTRAINT [DF_Matches_CreatedAt]       DEFAULT (SYSDATETIME()),
    [UpdatedAt]                 DATETIME2(7)    NULL,

    CONSTRAINT [PK_Matches]                 PRIMARY KEY CLUSTERED ([MatchId]),
    CONSTRAINT [FK_Matches_HostUser]        FOREIGN KEY ([HostUserId])
                                            REFERENCES [dbo].[Users]([UserId])
                                            ON DELETE NO ACTION,
    CONSTRAINT [FK_Matches_Courts]          FOREIGN KEY ([CourtId])
                                            REFERENCES [dbo].[Courts]([CourtId])
                                            ON DELETE NO ACTION,
    CONSTRAINT [CK_Matches_SportType]       CHECK ([SportType] IN ('Badminton', 'Pickleball')),
    CONSTRAINT [CK_Matches_EndAfterStart]   CHECK ([EndTime] > [StartTime]),
    CONSTRAINT [CK_Matches_MaxMembers]      CHECK ([MaxMembers] > 0),
    CONSTRAINT [CK_Matches_EscrowAmount]    CHECK ([EscrowAmountPerPerson] >= 0),
    CONSTRAINT [CK_Matches_Status]          CHECK ([Status] IN ('Open', 'Full', 'InProgress', 'Completed', 'Cancelled'))
);
GO

-- B?ng 11: MatchMembers — Thành viên tham gia kèo
CREATE TABLE [dbo].[MatchMembers]
(
    [MemberId]      INT             IDENTITY(1,1)   NOT NULL,
    [MatchId]       INT             NOT NULL,
    [UserId]        INT             NOT NULL,
    [Status]        VARCHAR(20)     NOT NULL    CONSTRAINT [DF_MatchMembers_Status]     DEFAULT ('Pending'),
    [JoinedAt]      DATETIME2(7)    NOT NULL    CONSTRAINT [DF_MatchMembers_JoinedAt]   DEFAULT (SYSDATETIME()),

    CONSTRAINT [PK_MatchMembers]                PRIMARY KEY CLUSTERED ([MemberId]),
    CONSTRAINT [UQ_MatchMembers_MatchUser]      UNIQUE ([MatchId], [UserId]),
    CONSTRAINT [FK_MatchMembers_Matches]        FOREIGN KEY ([MatchId])
                                                REFERENCES [dbo].[Matches]([MatchId])
                                                ON DELETE NO ACTION,
    CONSTRAINT [FK_MatchMembers_Users]          FOREIGN KEY ([UserId])
                                                REFERENCES [dbo].[Users]([UserId])
                                                ON DELETE NO ACTION,
    CONSTRAINT [CK_MatchMembers_Status]         CHECK ([Status] IN ('Pending', 'Approved', 'Rejected', 'CheckedIn', 'NoShow'))
);
GO

-- B?ng 12: EscrowTransactions — L?u v?t giao d?ch ví ký qu?
CREATE TABLE [dbo].[EscrowTransactions]
(
    [TransactionId]     INT             IDENTITY(1,1)   NOT NULL,
    [WalletId]          INT             NOT NULL,
    [MatchId]           INT             NOT NULL,
    [Amount]            DECIMAL(18,2)   NOT NULL,
    [TransactionType]   VARCHAR(20)     NOT NULL,
    [Description]       NVARCHAR(500)   NULL,
    [CreatedAt]         DATETIME2(7)    NOT NULL    CONSTRAINT [DF_EscrowTx_CreatedAt]  DEFAULT (SYSDATETIME()),

    CONSTRAINT [PK_EscrowTransactions]              PRIMARY KEY CLUSTERED ([TransactionId]),
    CONSTRAINT [FK_EscrowTx_Wallets]                FOREIGN KEY ([WalletId])
                                                    REFERENCES [dbo].[EscrowWallets]([WalletId])
                                                    ON DELETE NO ACTION,
    CONSTRAINT [FK_EscrowTx_Matches]                FOREIGN KEY ([MatchId])
                                                    REFERENCES [dbo].[Matches]([MatchId])
                                                    ON DELETE NO ACTION,
    CONSTRAINT [CK_EscrowTx_Amount]                 CHECK ([Amount] > 0),
    CONSTRAINT [CK_EscrowTx_TransactionType]        CHECK ([TransactionType] IN ('Freeze', 'Release', 'Forfeit'))
);
GO

-- ============================================================================
-- PH?N 3: T?O CÁC INDEX B? SUNG (Performance)
-- ============================================================================

-- Tìm booking theo User
CREATE NONCLUSTERED INDEX [IX_Bookings_UserId]
ON [dbo].[Bookings] ([UserId]);
GO

-- Tìm booking theo ngày + sân
CREATE NONCLUSTERED INDEX [IX_Bookings_CourtDate]
ON [dbo].[Bookings] ([CourtId], [BookingDate]);
GO

-- Tìm payment theo Booking
CREATE NONCLUSTERED INDEX [IX_Payments_BookingId]
ON [dbo].[Payments] ([BookingId]);
GO

-- Tìm matches theo ngày
CREATE NONCLUSTERED INDEX [IX_Matches_MatchDate]
ON [dbo].[Matches] ([MatchDate]);
GO

-- Tìm matches theo host
CREATE NONCLUSTERED INDEX [IX_Matches_HostUserId]
ON [dbo].[Matches] ([HostUserId]);
GO

-- Tìm escrow transactions theo ví
CREATE NONCLUSTERED INDEX [IX_EscrowTx_WalletId]
ON [dbo].[EscrowTransactions] ([WalletId]);
GO

-- Tìm EquipmentUnits theo EquipmentId
CREATE NONCLUSTERED INDEX [IX_EquipmentUnits_EquipmentId]
ON [dbo].[EquipmentUnits] ([EquipmentId]);
GO

-- Tìm EquipmentUnits c?n thanh lý (RentalCount >= 20)
CREATE NONCLUSTERED INDEX [IX_EquipmentUnits_Liquidation]
ON [dbo].[EquipmentUnits] ([RentalCount], [Status])
WHERE [Status] = 'Available' AND [RentalCount] >= 20;
GO

-- Tìm Vouchers theo User
CREATE NONCLUSTERED INDEX [IX_Vouchers_UserId]
ON [dbo].[Vouchers] ([UserId]);
GO

-- Tìm Vouchers active ch?a h?t h?n
CREATE NONCLUSTERED INDEX [IX_Vouchers_Active]
ON [dbo].[Vouchers] ([Status], [ExpiresAt])
WHERE [Status] = 'Active';
GO

PRINT N'? Schema ProSportDB ?ã ???c t?o thành công v?i 14 b?ng, ràng bu?c và index.';
GO
