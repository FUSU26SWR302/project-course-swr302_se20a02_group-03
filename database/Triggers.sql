USE [ProSportDB];
GO

-- ============================================
-- Payment Success Trigger
-- ============================================
CREATE OR ALTER TRIGGER trg_PaymentSuccess
ON Payments
AFTER INSERT
AS
BEGIN

    UPDATE b
    SET b.Status='Paid'
    FROM Bookings b
    INNER JOIN inserted i
        ON b.BookingId=i.BookingId
    WHERE i.Status='Success';

END
GO

-- ============================================
-- Equipment Rental Count
-- ============================================
CREATE OR ALTER TRIGGER trg_EquipmentReturned
ON BookingDetails_Equipments
AFTER INSERT
AS
BEGIN

    UPDATE eu
    SET RentalCount = RentalCount + 1
    FROM EquipmentUnits eu
    INNER JOIN inserted i
        ON eu.EquipmentId = i.EquipmentId;

END
GO