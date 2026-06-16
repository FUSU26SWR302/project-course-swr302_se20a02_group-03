-- ============================================================================
-- PRO-SPORT COMPLEX — Database Schema Script
-- Target: Microsoft SQL Server 2019+
-- Encoding: UTF-8 (hỗ trợ NVARCHAR cho tiếng Việt)
-- Author: Senior Database Engineer (AI-Assisted)
-- Date: 2026-05-26
-- ============================================================================
-- HƯỚNG DẪN: Copy toàn bộ script này và chạy trên SSMS (SQL Server Management Studio).
-- Script sẽ tạo database ProSportDB và toàn bộ 12 bảng theo đúng thứ tự dependency.
-- ============================================================================

-- ============================================================================
-- PHẦN 1: TẠO DATABASE
-- ============================================================================
USE [master];
GO

-- Xóa database cũ nếu tồn tại (CHỈ DÙNG KHI PHÁT TRIỂN)
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
-- PHẦN 2: TẠO CÁC BẢNG (theo thứ tự dependency — bảng cha trước, bảng con sau)
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- PHÂN HỆ 1: QUẢN LÝ TÀI KHOẢN & ĐỊNH DANH
-- ────────────────────────────────────────────────────────────────────────────

-- Bảng 1: Users — Tài khoản người dùng
CREATE TABLE [dbo].[Users]
(
    [UserId]            INT             IDENTITY(1,1)   NOT NULL,
    [FullName]          NVARCHAR(100)   NOT NULL,
    [Email]             VARCHAR(255)    NOT NULL,
    [PasswordHash]      VARCHAR(500)    NULL,
    [PhoneNumber]       VARCHAR(15)     NULL,
    [Role]              VARCHAR(20)     NOT NULL,
    [EKycStatus]        VARCHAR(20)     NOT NULL    CONSTRAINT [DF_Users_EKycStatus]        DEFAULT ('Unverified'),
    [AvatarUrl]         VARCHAR(500)    NULL,
    [GoogleId]          VARCHAR(100)    NULL,
    [IsPhoneVerified]   BIT             NOT NULL    CONSTRAINT [DF_Users_IsPhoneVerified]   DEFAULT (0),
    [IsDeleted]         BIT             NOT NULL    CONSTRAINT [DF_Users_IsDeleted]         DEFAULT (0),
    [CreatedAt]         DATETIME2(7)    NOT NULL    CONSTRAINT [DF_Users_CreatedAt]         DEFAULT (SYSDATETIME()),
    [UpdatedAt]         DATETIME2(7)    NULL,

    CONSTRAINT [PK_Users]               PRIMARY KEY CLUSTERED ([UserId]),
    CONSTRAINT [UQ_Users_Email]         UNIQUE ([Email]),
    CONSTRAINT [CK_Users_Role]          CHECK ([Role] IN ('Admin', 'Staff', 'Customer')),
    CONSTRAINT [CK_Users_EKycStatus]    CHECK ([EKycStatus] IN ('Unverified', 'Pending', 'Verified', 'Rejected'))
);
GO

-- Unique Index cho GoogleId (nếu khác NULL)
CREATE UNIQUE NONCLUSTERED INDEX [UQ_Users_GoogleId]
ON [dbo].[Users] ([GoogleId])
WHERE [GoogleId] IS NOT NULL;
GO

-- Bảng 2: EscrowWallets — Ví ký quỹ (quan hệ 1:1 với Users)
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

-- ────────────────────────────────────────────────────────────────────────────
-- PHÂN HỆ 2: QUẢN LÝ SÂN BÃI & GIÁ ĐỘNG
-- ────────────────────────────────────────────────────────────────────────────

-- Bảng 3: Courts — Sân bãi
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

-- Bảng 4: TimeSlots — Khung giờ hoạt động cố định
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

-- Bảng 5: PriceMatrix — Ma trận giá động (Sân × Khung giờ × Loại ngày)
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

-- ────────────────────────────────────────────────────────────────────────────
-- PHÂN HỆ 3: QUẢN LÝ THIẾT BỊ & MÔ HÌNH "TRY-BEFORE-YOU-BUY"
-- ────────────────────────────────────────────────────────────────────────────
-- Mô hình: Khách thuê vợt → thử → thích → MUA CÂY MỚI cùng mẫu (lấy từ SalesStock).
--          Cây vợt cho thuê được TRẢ LẠI kho thuê, tiếp tục cho khách khác thuê.
--          Khi 1 cây đạt 20 lần thuê → chuyển sang kho thanh lý (đồ cũ).
-- HAI KHO TÁCH BIỆT:
--   • RentalStock = số cây vợt vật lý dùng cho thuê (chi tiết ở bảng EquipmentUnits)
--   • SalesStock  = số cây vợt MỚI NGUYÊN HỘP dùng để bán cho khách muốn mua đứt

-- Bảng 6: Equipments — Danh mục mẫu vợt (catalog level)
-- RetailPrice = Giá bán lẻ gốc cây vợt mới
-- RentalPrice = Computed column = 5% RetailPrice (giá thuê mặc định/ngày)
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

-- Bảng 6b: EquipmentUnits — Từng cây vợt vật lý trong KHO CHO THUÊ (unit level)
-- Mỗi bản ghi = 1 cây vợt thực tế dùng để cho thuê, được nhiều khách thuê luân phiên.
-- Sau mỗi lần thuê xong → cây vợt trả lại kho thuê → RentalCount += 1.
-- Khi RentalCount >= 20 → Application chuyển Status → 'Liquidated' (kho thanh lý đồ cũ).
-- LƯU Ý: Đây KHÔNG phải vợt mới bán cho khách. Vợt bán lấy từ SalesStock của Equipments.
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

-- ────────────────────────────────────────────────────────────────────────────
-- PHÂN HỆ 4: LUỒNG ĐẶT SÂN & THUÊ VỢT
-- ────────────────────────────────────────────────────────────────────────────

-- Bảng 7: Bookings — Đơn đặt sân
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

-- Index lọc: Chống trùng lịch đặt sân (cho phép nhiều bản ghi Cancelled trên cùng slot)
CREATE UNIQUE NONCLUSTERED INDEX [UX_Bookings_NoDuplicate]
ON [dbo].[Bookings] ([CourtId], [SlotId], [BookingDate])
WHERE [Status] <> 'Cancelled';
GO

-- Bảng 8: BookingDetails_Equipments — Chi tiết thuê vợt đi kèm Booking
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

-- ────────────────────────────────────────────────────────────────────────────
-- PHÂN HỆ 4b: VOUCHER "TRY-BEFORE-YOU-BUY"
-- ────────────────────────────────────────────────────────────────────────────

-- Bảng 8b: Vouchers — Voucher khấu trừ khi mua CÂY MỚI cùng mẫu đã thuê
-- Sinh tự động khi confirm thuê vợt, giá trị = số tiền thuê, hiệu lực 24h.
-- Khi dùng voucher → trừ giá vào RetailPrice → lấy 1 cây MỚI từ SalesStock (KHÔNG bán cây vừa thuê).
-- Cây thuê được trả lại kho cho thuê (EquipmentUnits), tiếp tục cho khách khác thuê.
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

-- ────────────────────────────────────────────────────────────────────────────
-- PHÂN HỆ 5: LUỒNG THANH TOÁN (VNPAY)
-- ────────────────────────────────────────────────────────────────────────────

-- Bảng 9: Payments — Lịch sử giao dịch thanh toán
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

-- ────────────────────────────────────────────────────────────────────────────
-- PHÂN HỆ 6: LUỒNG CÁP KÈO & KÝ QUỸ (MATCHMAKING & ESCROW)
-- ────────────────────────────────────────────────────────────────────────────

-- Bảng 10: Matches — Bài đăng cáp kèo / giao lưu
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

-- Bảng 11: MatchMembers — Thành viên tham gia kèo
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

-- Bảng 12: EscrowTransactions — Lưu vết giao dịch ví ký quỹ
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
-- PHẦN 3: TẠO CÁC INDEX BỔ SUNG (Performance)
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

-- Tìm EquipmentUnits cần thanh lý (RentalCount >= 20)
CREATE NONCLUSTERED INDEX [IX_EquipmentUnits_Liquidation]
ON [dbo].[EquipmentUnits] ([RentalCount], [Status])
WHERE [Status] = 'Available' AND [RentalCount] >= 20;
GO

-- Tìm Vouchers theo User
CREATE NONCLUSTERED INDEX [IX_Vouchers_UserId]
ON [dbo].[Vouchers] ([UserId]);
GO

-- Tìm Vouchers active chưa hết hạn
CREATE NONCLUSTERED INDEX [IX_Vouchers_Active]
ON [dbo].[Vouchers] ([Status], [ExpiresAt])
WHERE [Status] = 'Active';
GO

PRINT N'✅ Schema ProSportDB đã được tạo thành công với 14 bảng, ràng buộc và index.';
GO
