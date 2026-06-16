# Pro-Sport Complex Database Dictionary

## Users

| Column | Type | Description |
|----------|----------|----------|
| UserId | INT | Primary Key |
| FullName | NVARCHAR(100) | User Full Name |
| Email | VARCHAR(255) | Login Email |
| Role | VARCHAR(20) | Admin / Staff / Customer |

## Courts

| Column | Type | Description |
|----------|----------|----------|
| CourtId | INT | Primary Key |
| CourtName | NVARCHAR(100) | Court Name |
| SportType | VARCHAR(20) | Badminton/Pickleball |
| Status | VARCHAR(20) | Active/Maintenance |

## Bookings

| Column | Type | Description |
|----------|----------|----------|
| BookingId | INT | Primary Key |
| UserId | INT | FK User |
| CourtId | INT | FK Court |
| SlotId | INT | FK TimeSlot |
| BookingDate | DATE | Date of booking |
| TotalAmount | DECIMAL(18,2) | Booking cost |

## Payments

| Column | Type | Description |
|----------|----------|----------|
| PaymentId | INT | Primary Key |
| BookingId | INT | FK Booking |
| Amount | DECIMAL(18,2) | Payment amount |
| Status | VARCHAR(20) | Success/Failed |

## Matches

| Column | Type | Description |
|----------|----------|----------|
| MatchId | INT | Primary Key |
| HostUserId | INT | FK User |
| CourtId | INT | FK Court |
| MatchDate | DATE | Match Date |
