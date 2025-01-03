# Library Management System

This is a **Library Management System** built using **Node.js**, **Express**, **TypeScript**, **Next.js**, and **PostgreSQL**. It is designed to efficiently manage library operations such as book, author, category, and user management.

## Technologies Used

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: Next.js (React-based framework)
- **Database**: PostgreSQL
- **API Testing**: Postman
- **ORM**: Sequelize
- **Environment Management**: Dotenv

## Features

- **Book Management**: Create, read, update, and delete books. Manage book availability, status, and borrowing records.
- **Author Management**: Manage author details including their name, bio, and other information.
- **Category Management**: Classify books into categories such as Fiction, Non-Fiction, etc.
- **User Management**: Add and manage users, track user roles (Admin/User), and update user details.
- **Borrowing System**: Allows users to borrow, return, and renew books.

## Result

Homepage: 

![Home](./public/images/homepage.png)

Authors Management:

![Authors](./public/images/author-page.png)

Category Management:

![Category](./public/images/category-page.png)

Book Management:

![Book Management](./public/images/book-page.png)

Users Management:

![User](./public/images/user-page.png)

## Installation

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/pchihieuu/library-management
```
### 2. Navigate into the project directory
```bash
cd library-management-system
cd backend
cd frontend
```
### 3. Install dependencies
```bash 
npm install
pnpm install
```
### 4. Set up environment variables

Create a .env file in the root directory and configure your PostgreSQL credentials:
```bash
DB_HOST=localhost
DB_PORT=YOUR_PORT
DB_USER=YOUR_PG_USER
DB_PASSWORD=YOUR_PG_PASSWORD
DB_NAME=YOUR_DATABASE
```
### 5. Run database migrations
Make sure PostgreSQL is running and execute the migrations to set up the database:
```bash
npx sequelize-cli db:migrate
```
### 6. Build the application
```bash
npm run build
pnpm build
```

### 7. Run the application
```bash
npm run dev 
pnpm dev
```

### 8. Test the application
```bash
npm test
```bash
npm test -- --coverage
```
## Docker Setup
### Requirements:
- Docker installed on your machine.
- Docker Compose installed.
### 1. Set up environment locals for docker
The application uses the following environment variables stored in a `.env` file:
```bash
POSTGRES_HOST=db
POSTGRES_DB=YOUR_DB
POSTGRES_PORT=YOUR_PORT
POSTGRES_USER=YOUR_USER
POSTGRES_PASSWORD=YOUR_PASSWORD
GATEWAY_HOST=YOUR_GATEWAY_HOST
```
### 2. Build and Run the Application
To build and start the application, run:
```bash
docker-compose up --build
```
This will:
- Build the Docker image for the backend.
- Start the backend service on http://localhost:8000.
- Start a PostgreSQL database service.

### 3. Accessing the Application
- Backend: http://localhost:8000
- PostgreSQL: Accessible on localhost:5432

### 4. Stopping the Application
To stop all services and remove the containers, run:
```bash
docker-compose down
```
### 5. Restarting the Application
To restart the services without rebuilding:
```bash
docker-compose up -d
```
To rebuild and restart:
```bash
docker-compose up --build -d
```
```bash
docker-compose exec -it backend sh
```
The backend server will run on http://localhost:8000, and the frontend NextJS application will be available at http://localhost:3000.

## API Documentation
The API is documented using Postman. You can explore and test the available API endpoints via the following link:
[Library Management API Documentation](https://s.net.vn/wVhB)

## ERD Diagram

Here is the **Entity-Relationship Diagram (ERD)** of the library management system:

![ERD Diagram](./public/images/fullstack-boolfly.png)

## Testing API
To test the API, we recommend using Postman. You can import the Postman collection into your Postman workspace by following these steps:

Go to File → Import in Postman.
Select the Import from Link option.
Paste the Postman collection link provided above.
### Example Test Data for Book Management API
Create Book Request
URL: POST /books
Body:
```bash
{
    "Title": "1982",
    "AuthorBook": "George Orwell",
    "PublicationYear": 1930,
    "ISBN": "978-0451524921",
    "Description": "A dystopian novel set in a totalitarian society under constant surveillance, where the government controls everything.",
    "TotalCopies": 100,
    "AvailableCopies": 55,
    "Status": "available",
    "CategoryBook": "Dystopian"
  }
```

Update Book Request
URL: PATCH /books/:id
Body:
```bash
{
    "TotalCopies": 200
}
```
