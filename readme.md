
# Subscription Tracker 🚀

A robust and scalable backend application for managing subscriptions. This project provides a RESTful API for user authentication, subscription management, and analytics. Built with **Node.js**, **Express.js**, and **MongoDB**, it’s designed to power your subscription-tracking applications seamlessly.

---

## ✨ Features

- **User Authentication**: Secure login and registration using **JWT (JSON Web Tokens)**.
- **Subscription Management**: Add subscriptions via API endpoints.
- **Analytics**: Track subscription spending and trends over time.
- **Error Handling**: Robust error handling and request validation.
- **Environment Configuration**: Configurable settings for development, testing, and production.
- **Scalability**: Designed to be scalable and maintainable for future enhancements.

---

## 🛠️ Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB (with Mongoose for schema modeling)
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API for seamless communication
- **Environment Management**: Dotenv for environment variables

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (installed and running)

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/AB-Code-Hub/subscription-tracker.git
   ```

2. **Install dependencies**:
   ```sh
   cd subscription-tracker && npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/subscription-tracker
     JWT_SECRET=your_jwt_secret_key
     ```

### Running the Application

1. **Start MongoDB**:
   ```sh
   mongod
   ```

2. **Start the backend server**:
   ```sh
   npm start
   ```

3. **Access the API**:
   - The server will run on `http://localhost:5000`.
   - Use tools like **Postman** or **Insomnia** to test the endpoints.




## 🛠️ API Endpoints

### Authentication
- **POST /api/auth/register**: Register a new user.
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **POST /api/auth/login**: Log in an existing user.
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **GET /api/auth/me**: Get current user details (protected route).

### Subscription Management
- **POST /api/subscriptions**: Add a new subscription.
  ```json
  {
    "name": "Netflix",
    "price": 15.99,
    "startDate": "2023-10-01",
    "renewalDate": "2023-11-01"
  }
  ```


## 🤝 Contributing

Contributions are welcome! Follow these steps to contribute:

1. **Fork the repository**.
2. **Create a new branch**:
   ```sh
   git checkout -b feature/YourFeatureName
   ```
3. **Commit your changes**:
   ```sh
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**:
   ```sh
   git push origin feature/YourFeatureName
   ```
5. **Open a Pull Request**.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments
- **Express.js** for building a robust backend.
- **MongoDB** for seamless database integration.
- **JWT** for secure authentication.

---

Enjoy building with this backend! 💻  

