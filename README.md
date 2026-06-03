[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/e_CNHJva)

https://vyho0509.atlassian.net/jira/software/projects/KAN/list?jql=project+%3D+KAN+ORDER+BY+cf%5B10019%5D+ASC&atlOrigin=eyJpIjoiZWRlNzA4MmQ2OTVhNDEzM2I5YmJkNmI5MGUxMzJhMWQiLCJwIjoiaiJ9

# Pro-Sport Complex Management System with AI

## 1. Introduction

Pro-Sport Complex Management System with AI is a web-based platform designed for sports complexes (focusing on Badminton and Pickleball) that seamlessly connects players, coordinates court bookings, and streamlines administrative operations.

The system allows players to find and book courts based on:
- Sport type (Badminton/Pickleball)
- Court availability (Real-time interactive grid schedule)
- Price per hour
- On-premise amenities and location
- Shared match requirements

In addition, the platform integrates an AI Sports Assistant that helps users find available slots and automatically pairs them with suitable playing partners using natural language.

Example:
"I need a badminton court this Friday at 6 PM and want to find 3 other players to split the fee."

The AI system will analyze the budget, location, and schedule to recommend the perfect court and auto-generate a social matching pool.

The project also supports:
- Online court booking & deposit payment (VNPay/MoMo)
- Automated escrow wallet for split payments (Chống bùng kèo)
- Court & inventory lifecycle management (Condition check & Surcharge)
- Try-Before-You-Buy promotional workflow (Rental fees to purchase vouchers)
- Manager dashboard & analytics system

---

# 2. Research-Based Learning (RBL)

## Main Research Focus

This project applies the Research-Based Learning (RBL) approach focusing on:

### 2.1 System Architecture Research
Research and design of a decoupled, high-performance full-stack web application architecture including:
- Frontend architecture using ReactJS, TailwindCSS, and Shadcn UI components
- Backend RESTful API using ASP.NET Core Web API (.NET 8/9) with layered architecture (Controller - Service - Repository)
- Microsoft SQL Server relational database design
- AI service integration (OpenAI API) for natural language court pairing
- External payment gateway integration (VNPay/MoMo Sandbox)

---

### 2.2 Database Design & Optimization
Research on:
- Database normalization (3NF) for complex entity relationships (Users, Courts, Bookings, Inventory, Transactions)
- Relational database constraints and cascading behaviors
- Index optimization on high-frequency query fields (e.g., Slot time, Court status)
- Database Transactions and Isolation Levels to prevent double-booking anomalies
- Soft delete strategy for court posts and customer matching profiles
- Audit tracking for escrow wallets and financial transparency

The system database is designed to handle:
- User authentication & role management
- Real-time court scheduling matrix
- Escrow transactions & split payment flows
- Rental gear inventory logs
- AI-assisted matching conversation history

---

### 2.3 AI Assistant Integration
Research on integrating OpenAI API into a sports coordination platform.

The AI assistant supports:
- Natural language processing for instant court scheduling
- Smart player pairing based on skill levels and geographic location
- Interactive sports gear recommendations based on playstyle

Example:
"Find me a pickleball court for 4 people this weekend under 200k/hour and match me with intermediate partners."

The AI system analyzes:
- User budget & peak-hour rates
- Real-time slot availability
- Player trust scores & skill metrics

Then returns optimal combinations of courts and active match pools.

---

### 2.4 Payment Gateway & Escrow Integration
Research on secure online transaction processing via VNPay Sandbox:
- Real-time court deposit collection (50% or 100%)
- Automated split-payment logic for social matches
- Escrow wallet management (holding funds securely until the match concludes)
- Instant fallback and refund handling if a host cancels or joiners no-show

---

### 2.5 UI/UX Research
Research on:
- Responsive web design for the court booking calendar grid (Desktop & Mobile view)
- Seamless POS interface design for court staff handling equipment check-ins
- Dynamic data visualization for admin financial dashboards
- Intuitive messaging and status indicator interfaces for the AI assistant interaction

---

# 3. Technologies Used

## Frontend
- ReactJS
- TailwindCSS / Shadcn UI
- Axios
- React Router

---

## Backend
- ASP.NET Core Web API (.NET 8/9)
- Entity Framework Core (Code-First Approach)
- JWT Authentication & Claim-based Authorization

---

## Database
- Microsoft SQL Server

---

## AI
- OpenAI API (Smart Matching Engine)
- Cursor AI (AI-Assisted Engineering)

---

## Payment
- VNPay Sandbox / MoMo API

---

## Tools
- GitHub Classroom (Branching & Pull Request Flow)
- Google Stitch / Figma (UI/UX Mockups)
- Postman
- PlantUML
- Visual Studio Code / Cursor

---

# 4. Main Features

## Customer (Player) Features
- Register/Login & E-KYC verification (Student ID/CCCD upload)
- View interactive real-time court availability grid
- Book court and pay deposit via VNPay
- Create a match pool (Host) or browse and join open slots (Joiner)
- Auto-split fees with escrow security
- Rent rackets/balls and receive a 24-hour "Try-Before-You-Buy" voucher
- Converse with the AI Sports Assistant

---

## Staff Features
- Scan QR code for fast court check-in
- Live court schedule tracking and check-out management
- On-premise equipment rental processing
- Rental condition verification (Condition dropdown options)
- Issue automatic surcharges for damaged gear

---

## Admin Features
- User & staff role management
- Court inventory configuration and hourly rate setups
- Stock tracking for pro-shop sales and rental assets
- Dynamic financial analytics (Revenue split by courts, items, and penalties)

---

# 5. System Architecture

```text
Frontend (ReactJS + TailwindCSS)
                 ↓
Backend API (ASP.NET Core Web API)
                 ↓
      Microsoft SQL Server
                 ↓
       External Services
   ├── OpenAI API (Smart Match)
   └── VNPay Sandbox Gateway
