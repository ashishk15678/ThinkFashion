# ThinkFashion Ecommerce Platform

A modern, full-featured ecommerce platform for fashion products, built with a robust MERN stack and a beautiful, responsive UI. Includes a powerful admin panel, secure authentication, Stripe payments, product management, user management, and more.

---

## 🚀 Features

### 🛍️ Customer Features

- **Product Browsing**: View products by category, type, or search by keyword.
- **Product Details**: See detailed product info, images, available sizes/colors, and related products.
- **Add to Cart & Buy Now**: Seamless cart management and quick buy options.
- **Order Placement**: Secure checkout with Stripe payment integration.
- **Order History**: View your past orders and their statuses.
- **Product Comments**: Add, edit, like, and delete comments on products.
- **Responsive Design**: Fully mobile-friendly and modern UI.
- **User Profile**: Manage your account details and view your dashboard.
- **Dark Mode**: Toggle between light and dark themes.

### 🛠️ Admin Features

- **Admin Dashboard**: Overview of users, products, comments, and transactions.
- **Product Management**: Add, edit, delete, and search products. Upload images to Cloudinary.
- **Order Management**: View all orders, update delivery status, and delete orders.
- **User Management**: View, paginate, and delete users.
- **Comment Moderation**: View and delete all product comments.
- **Analytics**: See total users, products, and comments at a glance.
- **Protected Routes**: Only admins can access admin features.

### 🔒 Authentication & Security

- **JWT Authentication**: Secure login and protected API routes.
- **Role-based Access**: Separate user and admin privileges.
- **Password Hashing**: User passwords are securely hashed.
- **Google OAuth**: (Optional) Social login support.

### 💳 Payments

- **Stripe Integration**: Fast, secure payments with Stripe Checkout.
- **Order Creation**: Orders are created and tracked after successful payment.

### 🧩 Tech Stack

- **Frontend**: React, Vite, Redux Toolkit, React Router, Flowbite, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Payments**: Stripe
- **Image Uploads**: Cloudinary
- **State Management**: Redux Toolkit, Redux Persist
- **UI/UX**: Flowbite, DaisyUI, Tailwind CSS, React Icons

---

## 🖥️ Project Structure

- `/client` — React frontend (Vite, Tailwind, Redux, etc.)
- `/api` — Node.js/Express backend (REST API, MongoDB, Stripe, Cloudinary)

---

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ThinkFashion.git
cd ThinkFashion
```

### 2. Setup Environment Variables

- Copy `.env.example` to `.env` in both `/api` and `/client` folders and fill in your credentials (MongoDB, Stripe, Cloudinary, etc).

### 3. Install Dependencies

```bash
cd api && npm install
cd ../client && npm install
```

### 4. Run the App

- **Backend**: `cd api && npm run dev`
- **Frontend**: `cd client && npm run dev`

The app will be available at `http://localhost:5173` (or your Vite port).

---

## 🧑‍💼 Admin Panel Access (Test)

- **URL**: `/admin/login` or `/dashboard`
- **Email**: thinkfashion@gmail.com
- **Password**: abc123

---

## 📦 API Highlights

- RESTful endpoints for products, users, orders, comments, and payments
- JWT-protected routes for users and admins
- Pagination and search for products and users
- Cloudinary image uploads for products and avatars
- Stripe payment and order creation

---

## 🌟 License

- Licensed under MIT

---

> **ThinkFashion** — Modern ecommerce, made simple and beautiful.

### For test purpose

admin panel access :

email : thinkfashion@gmail.com

password: abc123
