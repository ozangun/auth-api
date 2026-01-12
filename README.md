# Auth API – Node.js & PostgreSQL

A backend authentication API built with **Node.js**, **Express**, and **PostgreSQL**.  
This project implements a complete authentication flow including **registration, login, email verification, JWT authentication, and protected routes**.

---

## 🚀 Features

- User registration with email & password
- Password hashing using **bcrypt**
- Email verification with token & expiration
- Resend verification email
- User login with **JWT authentication**
- Protected routes with auth middleware
- PostgreSQL database integration
- Environment variable configuration using `.env`

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **bcrypt**
- **jsonwebtoken (JWT)**
- **Resend (Email service)**
- **dotenv**

---

## 📂 Project Structure

auth-api/
│
├── controllers/
│ └── auth.controller.js
│
├── middlewares/
│ └── auth.middleware.js
│
├── routes/
│ ├── auth.routes.js
│ └── user.routes.js
│
├── utils/
│ ├── hash.js
│ ├── jwt.js
│ ├── mail.js
│ ├── token.js
│ └── validator.js
│
├── config/
│ └── db.js
│
├── app.js
├── package.json
└── .env

---

## 🔐 Authentication Flow

### 1️⃣ Register
- User registers with email & password
- Password is hashed
- Verification token is generated
- Verification email is sent
- User must verify email before login

### 2️⃣ Email Verification
- User clicks verification link
- Token and expiration are validated
- Account is activated

### 3️⃣ Login
- Email & password validation
- Email verification check
- JWT token generation

### 4️⃣ Protected Routes
- JWT token is required in `Authorization` header
- Middleware validates token
- User data is available via `req.user`

---

## 📡 API Endpoints

### Auth

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |
| GET | `/auth/verify?token=...` | Verify email |
| POST | `/auth/resend-verification` | Resend verification email |

### User

| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/profile` | Get user profile (protected) |

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=auth_db

SECRET_KEY=your_jwt_secret
BASE_URL=http://localhost:3000

RESEND_API_KEY=your_resend_api_key
```
---

npm install

npm run dev

---

🧠 Notes

Duplicate email handling is managed at the database level

Email enumeration is prevented in resend verification flow

Token expiration is enforced for email verification

Passwords are never stored in plain text

📌 Future Improvements

Password reset (forgot password flow)

Refresh token implementation

Rate limiting

Role-based authorization

👤 Author

Ozan Gün
Junior Backend Developer

GitHub: https://github.com/ozangun

---

