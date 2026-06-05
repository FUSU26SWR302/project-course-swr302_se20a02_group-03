USE [ProSportDB];
GO

-- ============================================
-- Booking Summary
-- ============================================
CREATE OR ALTER VIEW vw_BookingSummary
AS
SELECT

    b.BookingId,
    u.FullName,
    c.CourtName,
    ts.StartTime,
    ts.EndTime,
    b.BookingDate,
    b.TotalAmount,
    b.Status

FROM Bookings b
INNER JOIN Users u
ON b.UserId = u.UserId

INNER JOIN Courts c
ON b.CourtId = c.CourtId

INNER JOIN TimeSlots ts
ON b.SlotId = ts.SlotId;
GO

-- ============================================
-- Revenue View
-- ============================================
CREATE OR ALTER VIEW vw_RevenueSummary
AS
SELECT

    YEAR(CreatedAt) AS RevenueYear,
    MONTH(CreatedAt) AS RevenueMonth,
    SUM(Amount) AS TotalRevenue

FROM Payments

WHERE Status='Success'

GROUP BY
YEAR(CreatedAt),
MONTH(CreatedAt);
GO