USE [ProSportDB];
GO

-- ============================================
-- Create Booking
-- ============================================
CREATE OR ALTER PROCEDURE sp_CreateBooking
(
    @UserId INT,
    @CourtId INT,
    @SlotId INT,
    @BookingDate DATE,
    @TotalAmount DECIMAL(18,2)
)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS
    (
        SELECT 1
        FROM Bookings
        WHERE CourtId = @CourtId
          AND SlotId = @SlotId
          AND BookingDate = @BookingDate
          AND Status <> 'Cancelled'
    )
    BEGIN
        RAISERROR('Court already booked.',16,1);
        RETURN;
    END

    INSERT INTO Bookings
    (
        UserId,
        CourtId,
        SlotId,
        BookingDate,
        TotalAmount,
        Status
    )
    VALUES
    (
        @UserId,
        @CourtId,
        @SlotId,
        @BookingDate,
        @TotalAmount,
        'Pending'
    );
END
GO

-- ============================================
-- Available Courts
-- ============================================
CREATE OR ALTER PROCEDURE sp_GetAvailableCourts
(
    @BookingDate DATE,
    @SlotId INT
)
AS
BEGIN

    SELECT *
    FROM Courts c
    WHERE c.Status='Active'
    AND NOT EXISTS
    (
        SELECT 1
        FROM Bookings b
        WHERE b.CourtId=c.CourtId
        AND b.BookingDate=@BookingDate
        AND b.SlotId=@SlotId
        AND b.Status<>'Cancelled'
    );
END
GO

-- ============================================
-- Check In Booking
-- ============================================
CREATE OR ALTER PROCEDURE sp_CheckInBooking
(
    @BookingId INT
)
AS
BEGIN

    UPDATE Bookings
    SET Status='Completed',
        UpdatedAt=SYSDATETIME()
    WHERE BookingId=@BookingId;

END
GO