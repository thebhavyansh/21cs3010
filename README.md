# Railway Management API

## Overview
This is a RESTful API for a Railway Management System, similar to IRCTC, allowing users to:
- Register and log in.
- Check seat availability between stations.
- Book seats on available trains.
- Admins can add new trains, update seat counts, etc.

## Technologies Used
- **Node.js** and **Express** for the API
- **PostgreSQL** for the database
- **pg** and **pg-promise** for database interaction
- **JWT** for user authentication
- **Middleware** for admin API key protection


## Installation

### Step 1: Clone the repository

### Step 2: Install dependencies

### Step 3: Set up environment variables
Create a `.env` file in the root directory with the following content:


- Replace the database credentials with your actual PostgreSQL database details.
- The `JWT_SECRET` will be used for signing and verifying JWT tokens.
- The `API_KEY` is used for protecting admin routes.

### Step 4: Run the database migrations
To set up the database, run the SQL migrations by executing the following:

- psql -h your-database-host -U your-database-user -d railway_management -f database/migrations.sql

This will create the necessary tables (e.g., `users`, `trains`, `bookings`) in your PostgreSQL database.

### Step 5: Start the server

The API will now be running on **http://localhost:5000** by default.

### Step 6: Run Tests (Optional)
If you'd like to test the API endpoints, use the following command:

## API Endpoints

### Authentication
- **POST** `/auth/register`: Register a new user
- **POST** `/auth/login`: Log in with credentials to receive a JWT token

### Trains (Admin only)
- **POST** `/admin/train`: Add a new train
- **GET** `/trains`: Get all trains between source and destination

### Booking
- **GET** `/bookings/availability`: Get seat availability between source and destination
- **POST** `/bookings`: Book a seat on a train
- **GET** `/bookings/{bookingId}`: Get booking details by booking ID

## Middleware

- **authMiddleware.js**: Protects routes by verifying the user's JWT token.
- **apiKeyMiddleware.js**: Protects admin routes by verifying the API key.

## Environment Variables

- **`DB_HOST`**: Host address of your PostgreSQL database.
- **`DB_PORT`**: Port number for PostgreSQL (default is 5432).
- **`DB_USER`**: PostgreSQL database username.
- **`DB_PASSWORD`**: PostgreSQL database password.
- **`DB_NAME`**: Name of the PostgreSQL database (e.g., `railway_management`).
- **`JWT_SECRET`**: Secret key for signing JWT tokens.
- **`API_KEY`**: API key for authenticating admin routes.

