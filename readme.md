# Time Capsule API

Welcome to the **Time Capsule API**! This project is designed to provide a secure and user-friendly way to create and manage time capsules. Whether you want to store messages or files for future retrieval, this API ensures your data is encrypted and delivered at the right time.

## Features

- **User Authentication**: Register and login functionality with password hashing using bcrypt.
- **Capsule Creation**: Users can create time capsules with encrypted messages, attachments, and unlock dates.
- **Encryption**: Messages are encrypted using AES-256-CBC for secure storage.
- **Scheduler**: Automatically unlocks capsules at the specified date and notifies users via email.
- **Email Notifications**: Sends email alerts when capsules are unlocked.
- **RESTful API**: Provides endpoints for managing users, capsules, and testing encryption.

## Getting Started

To get started with the Time Capsule API, follow these steps:

1. **Clone the Repository**:  
    ```bash
    git clone https://github.com/your-username/time-capsule-api.git
    cd time-capsule-api
    ```

2. **Install Dependencies**:  
    Use npm or yarn to install the required dependencies.  
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:  
    Create a `.env` file in the root directory and configure the following variables:  
    ```env
    PORT=3000
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE=your_email_service
    EMAIL_USER=your_email_user
    EMAIL_PASSWORD=your_email_password
    ```

4. **Run the Application**:  
    Start the development server.  
    ```bash
    npm start
    ```

5. **Access the API**:  
    The API will be available at `http://localhost:5000`.

## API Endpoints

Here are some of the key endpoints provided by the Time Capsule API:

- **User Management**:
  - `POST /api/register`: Register a new user.
  - `POST /api/login`: Authenticate a user and retrieve a token.

- **Capsule Management**:
  - `POST /api/capsules`: Create a new time capsule.
  - `GET /api/capsules/:id`: Retrieve a specific capsule.
  - `DELETE /api/capsules/:id`: Delete a capsule.

- **Testing Encryption**:
  - `POST /api/encrypt`: Test message encryption.
  - `POST /api/decrypt`: Test message decryption.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and capsule data.
- **bcrypt**: Password hashing for secure authentication.
- **jsonwebtoken**: Token-based authentication.
- **Nodemailer**: Email notifications for capsule unlocks.
- **Crypto**: AES-256-CBC encryption for secure message storage.


The **Time Capsule API** is a Node.js-based backend application that allows users to create, encrypt, and schedule messages or files to be unlocked at a future date. It includes user authentication, message encryption, and email notifications when capsules are unlocked.
