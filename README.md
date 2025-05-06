# Library Management System  

The Library Management System is a full-fledged application built to manage library operations. The system includes features for managing books, authors, categories, and users, with capabilities such as borrowing and returning books, as well as tracking borrowing history.

## Table of Contents

1. [Introduction](#Introduction)
2. [Key Features](#Key-Features)
3. [System Overview](#👩‍💻-System-Overview)
4. [Repository Structure](#Repository-Structure)
5. [Installation Guide](#Installation-Guide)
    - [Requirements](#Requirements-📋)
    - [Setup](#🔨-setup)
## Introduction

The Library Management System is designed to help libraries manage their operations efficiently, from adding books to managing users and borrowing/returning books. The application is built with a Node.js backend, Next.js frontend, PostgreSQL database, and uses Sequelize for ORM. It includes features for managing books, authors, categories, and users with user roles, and allows tracking borrowing and returning history. It supports a clean, responsive user interface built using Next.js.

## Key Features

The project offers the following key features:

-   **Book Management**: Add, update, view, and delete books; track book availability and borrowing status.
-   **Author Management**: Manage author information including name, bio, and books written.
-   **Category Management**: Classify books into categories for easy browsing and search.
-   **User Management**: Add and manage users with different roles (Admin, User), update user details, and track borrowing history.
-   **Borrowing System**: Allow users to borrow, return, and renew books.
-   **Book Availability Tracking**: Track the status of each book (available, borrowed, reserved).

## System Overview

The system is built using a modern stack of technologies for both frontend and backend:

-   **Backend**: Node.js, Express, TypeScript
-   **Frontend**: Next.js (React-based framework)
-   **Database**: PostgreSQL
-   **API Testing**: Postman, Jest Framework
-   **ORM**: Sequelize
-   **Environment Management**: Dotenv

The system architecture is a monolithic design with a separation between frontend and backend services.

<img loading="lazy" src="/public/images/bookmanagement.jpg" alt="Architecture" width="100%">

## Installation Guide

### Requirements
Before setting up the project, make sure you have the following tools installed:

-   [Docker-Installation](https://docs.docker.com/get-docker/)
-   [Docker-Compose-Installation](https://docs.docker.com/compose/install/)
-   [Node.js (LTS) Installation](https://nodejs.org/en/download)
-   [Git Installation](https://git-scm.com/downloads)
-   [PostgreSQL Installation](https://www.postgresql.org/download/)

### Setup

1. **Clone the repository**: Start by cloning the repository to your local machine:

```bash
git clone https://github.com/pchihieuu/library-management.git
cd library-management
```

2. **Install Dependencies**: Navigate to both the backend and frontend directories and install dependencies:

```bash
cd backend
npm install
cd ../frontend
pnpm install
```

3. **Set Up Environment Variables**: Create a .env file in the root directory and add your PostgreSQL configuration:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=YOUR_PG_USER
DB_PASSWORD=YOUR_PG_PASSWORD
DB_NAME=YOUR_DB_NAME
```

3. **Run Database Migrations**: Make sure PostgreSQL is running and execute migrations to set up the database:

```bash
cd backend
npx sequelize-cli db:migrate
```

4. **Build and Run the Application**: You can now build and run both the backend and frontend:

```bash
# Build the backend
npm run build
# Run the backend
npm start

cd frontend
npm run build
npm start
```

5. **Docker Setup**: To run the application using Docker, follow these steps:
Set up environment variables in the .env file as mentioned above.
Run the application with Docker Compose:

```bash
docker-compose up --build
```
The backend will be available at http://localhost:5000, and the frontend will be available at http://localhost:3000.
