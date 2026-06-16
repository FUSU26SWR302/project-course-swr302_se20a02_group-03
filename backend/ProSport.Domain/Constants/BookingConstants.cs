namespace ProSport.Domain.Constants;

/// <summary>
/// Tập trung các magic string cho Booking, Payment, Transaction.
/// Giảm typo, dễ refactor, IntelliSense-friendly.
/// </summary>
public static class BookingStatus
{
    public const string Pending = "Pending";
    public const string Confirmed = "Confirmed";
    public const string Cancelled = "Cancelled";
    public const string Completed = "Completed";
}

public static class PaymentStatus
{
    public const string Pending = "Pending";
    public const string Paid = "Paid";
    public const string Refunded = "Refunded";
}

public static class PaymentMethod
{
    public const string VNPay = "VNPay";
    public const string Escrow = "Escrow";
    public const string Cash = "Cash";
}

public static class TransactionType
{
    public const string Deposit = "Deposit";
    public const string Withdraw = "Withdraw";
    public const string Payment = "Payment";
    public const string Refund = "Refund";
    public const string EscrowLock = "EscrowLock";
    public const string EscrowRelease = "EscrowRelease";
}

public static class TransactionStatus
{
    public const string Pending = "Pending";
    public const string Completed = "Completed";
    public const string Failed = "Failed";
}

public static class VnPayOrderType
{
    public const string Booking = "Booking";
    public const string Deposit = "Deposit";
}
