# KhanaKart 🍔🛒

A full-stack MERN (MongoDB, Express, React, Node.js) food delivery application with Razorpay payment integration.

## Features

### Customer Features
- 🔐 User authentication (Register/Login)
- 🍕 Browse restaurants and food items
- 🔍 Search for food items by name or category
- 🛒 Shopping cart functionality
- 💳 Secure payment via Razorpay
- 📦 Order tracking and history
- 🎫 Apply discount coupons

### Admin Features
- 🏪 Manage restaurants (Add/Edit/Delete)
- 🍽️ Manage food items (Add/Edit/Delete)
- 👥 Manage customers
- 🎁 Manage offers and coupons
- 📋 View and update order status

## Tech Stack

### Frontend
- React 18
- Redux Toolkit (State Management)
- React Router v6
- Axios
- React Toastify
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Razorpay Payment Gateway

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Razorpay Account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/404paras/mern_food_app.git
   cd mern_food_app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   RAZORPAY_KEYID=your_razorpay_key_id
   RAZORPAY_SECRET_KEY=your_razorpay_secret_key
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:4000/
   REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Run the Application**

   Backend:
   ```bash
   cd backend
   npm start
   ```

   Frontend:
   ```bash
   cd frontend
   npm start
   ```

   The app will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/v1/register` - Register a new user
- `POST /api/v1/login` - Login user

### Restaurants
- `GET /api/v1/getAllRestaurants` - Get all restaurants
- `GET /api/v1/getRestaurantInfo/:id` - Get restaurant details
- `GET /api/v1/getAllDishOfRestaurant/:id` - Get all dishes of a restaurant
- `POST /api/v1/admin/addRestaurant` - Add a restaurant (Admin)
- `DELETE /api/v1/admin/deleteRestaurant/:id` - Delete a restaurant (Admin)

### Food Items
- `POST /api/v1/admin/addFoodItems` - Add food item (Admin)
- `DELETE /api/v1/admin/deleteDish/:id` - Delete food item (Admin)

### Categories
- `GET /api/v1/category/:name` - Get restaurants by category
- `POST /api/v1/admin/category` - Add/Update category (Admin)

### Orders
- `POST /api/v1/order` - Create a new order
- `GET /api/v1/order/user/:userId` - Get user's orders
- `GET /api/v1/order/admin/all` - Get all orders (Admin)
- `PUT /api/v1/order/:orderId/status` - Update order status (Admin)

### Offers
- `GET /api/v1/getAllOffers` - Get all offers
- `POST /api/v1/addOrUpdateOffer` - Add/Update offer (Admin)
- `DELETE /api/v1/deleteOffer/:couponcode` - Delete offer (Admin)

### Users (Admin)
- `GET /api/v1/getAllUsers` - Get all users
- `DELETE /api/v1/deleteUser/:id` - Delete user
- `PUT /api/v1/user/update/:id` - Update user profile

## Project Structure

```
khanakart/
├── backend/
│   ├── controllers/       # Route handlers
│   ├── database/          # Database connection
│   ├── middleware/        # Custom middleware (auth, validation, error handling)
│   ├── models/            # Mongoose models
│   ├── Authenticator.js   # JWT authentication
│   └── app.js             # Express app entry point
│
├── frontend/
│   ├── public/            # Static files
│   └── src/
│       ├── assets/        # Images and static assets
│       ├── components/    # Reusable React components
│       ├── Data/          # API service functions
│       ├── pages/         # Page components
│       ├── store/         # Redux store and slices
│       ├── styles/        # CSS files
│       ├── App.js         # Main App component
│       └── server.js      # API configuration
│
└── README.md
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Input validation and sanitization
- Secure payment handling
- Error handling middleware

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

[404paras](https://github.com/404paras)

---

⭐ If you found this project helpful, please give it a star!