# 🔐 Auth API – Node.js & PostgreSQL

A backend authentication API built with **Node.js**, **Express**, and **PostgreSQL**.  
This project implements a **production-style authentication system** including:

- Email verification  
- JWT authentication  
- Protected routes  
- Change password  
- Forgot & reset password flow  

---

## 🚀 Features

- User registration with email & password
- Secure password hashing using **bcrypt**
- Email verification (token + expiration)
- Resend verification email
- Login with **JWT**
- Protected routes via auth middleware
- User profile endpoint 
- Change password (authenticated)
- Forgot password (email reset link)
- Reset password with token validation
- PostgreSQL integration
- Environment-based configuration

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **bcrypt**
- **jsonwebtoken (JWT)**
- **Resend** (Email service)
- **dotenv**

---

## 📂 Project Structure

auth-api/
│
├── controllers/
│ ├── auth.controller.js
│ └── user.controller.js
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
- Email verification token is generated
- Verification email is sent
- User **cannot login before verification**

---

### 2️⃣ Email Verification
- User clicks verification link
- Token & expiration are validated
- Account is marked as verified
- Verification token is cleared

---

### 3️⃣ Login
- Email & password validation
- Email verification check
- JWT token is generated and returned

---

### 4️⃣ Protected Routes
- JWT token is required in `Authorization` header
- Middleware validates token
- Authenticated user info is available via `req.user`

---

### 5️⃣ Change Password (Authenticated)
- Requires valid JWT
- Current password is verified
- New password is validated & hashed
- Password is updated securely

---

### 6️⃣ Forgot Password
- User submits email
- Reset token & expiration are generated
- Reset link is sent via email
- Same response returned even if email does not exist (anti-enumeration)

---

### 7️⃣ Reset Password
- User submits reset token + new password
- Token & expiration are validated
- Password is updated
- Reset token is cleared

---

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login & receive JWT |
| GET | `/auth/verify?token=...` | Verify email |
| POST | `/auth/resend-verification` | Resend verification email |
| POST | `/auth/forgot-password` | Send reset password email |
| POST | `/auth/reset-password` | Reset password with token |

---

### User Routes (Protected)

| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/user/profile` | Get user profile |
| POST | `/user/change-password` | Change password |

> 🔐 Protected routes require:
Authorization: Bearer <JWT_TOKEN>

---

## 🧾 Database Schema (users)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,

  is_verified BOOLEAN DEFAULT false,

  verify_token TEXT,
  verify_expires TIMESTAMP,

  reset_token TEXT,
  reset_expires TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Environment Variables
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

## 📦 Installation

npm install

npm run dev

---

## 🧠 Security Notes

- Passwords are never stored or sent in plain text
- Email verification & reset tokens have expiration
- JWT is required for protected endpoints
- Email enumeration is prevented in resend & forgot password flows
- Users cannot access protected routes without valid token

## 📌 Future Improvements

- Refresh token implementation
- Rate limiting
- Login attempt throttling
- Role-based authorization
- API documentation (Swagger)

## 👤 Author

Ozan Gün
Junior Backend Developer

GitHub: https://github.com/ozangun
Linkedin: https://www.linkedin.com/in/ozan-gun/
