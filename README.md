[![Github license](https://img.shields.io/github/license/pchihieuu/library-management.svg 'Github license')](https://github.com/pchihieuu/library-management/blob/master/LICENSE)
[![Open issues](https://img.shields.io/github/issues/pchihieuu/library-management.svg 'Open issues')](https://github.com/pchihieuu/library-management/issues)
[![Open Pull Requests](https://img.shields.io/github/issues-pr/pchihieuu/library-management.svg 'Open Pull Requests')](https://github.com/pchihieuu/library-management/pulls)
[![Commit activity](https://img.shields.io/github/commit-activity/m/pchihieuu/library-management.svg 'Commit activity')](https://github.com/pchihieuu/library-management/graphs/commit-activity)
[![GitHub contributors](https://img.shields.io/github/contributors/pchihieuu/library-management.svg 'Github contributors')](https://github.com/pchihieuu/library-management/graphs/contributors)

# Library Management System  [![Demo](https://img.shields.io/badge/Demo-2ea44f?style=for-the-badge)]() [![Documentation](https://img.shields.io/badge/Documentation-blue?style=for-the-badge)](https://pchihieuugmai-zsv8578.getoutline.com/doc/library-management-Pa3VNIVx63)

<a href="https://github.com/pchihieuu/library-management/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=%F0%9F%90%9B+Bug+Report%3A+">Bug Report ⚠️</a>

<a href="https://github.com/pchihieuu/library-management/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=RequestFeature:">Request Feature 👩‍💻</a>

The Library Management System is a full-fledged application built to manage library operations. The system includes features for managing books, authors, categories, and users, with capabilities such as borrowing and returning books, as well as tracking borrowing history.

## 🔎 Table of Contents

1. [Introduction](#Introduction)
2. [Key Features](#Key-Features)
3. [System Overview](#👩‍💻-System-Overview)
4. [Repository Structure](#Repository-Structure)
5. [Installation Guide](#Installation-Guide)
    - [📋 Requirements](#Requirements-📋)
    - [🔨 Setup](#🔨-setup)
6. [🙌 Contributing](#🙌-contributing-to-the-project)
8. [📝 License](#📝-license)

## Introduction

The Library Management System is designed to help libraries manage their operations efficiently, from adding books to managing users and borrowing/returning books. The application is built with a Node.js backend, Next.js frontend, PostgreSQL database, and uses Sequelize for ORM. It includes features for managing books, authors, categories, and users with user roles, and allows tracking borrowing and returning history. It supports a clean, responsive user interface built using Next.js.

## Key Features

The project offers the following key features:

-   📚 **Book Management**: Add, update, view, and delete books; track book availability and borrowing status.
-   ✍️ **Author Management**: Manage author information including name, bio, and books written.
-   🏷️ **Category Management**: Classify books into categories for easy browsing and search.
-   👤 **User Management**: Add and manage users with different roles (Admin, User), update user details, and track borrowing history.
-   🔄 **Borrowing System**: Allow users to borrow, return, and renew books.
-   📆 **Book Availability Tracking**: Track the status of each book (available, borrowed, reserved).

## 👩‍💻 System Overview

The system is built using a modern stack of technologies for both frontend and backend:

-   **Backend**: Node.js, Express, TypeScript
-   **Frontend**: Next.js (React-based framework)
-   **Database**: PostgreSQL
-   **API Testing**: Postman, Jest Framework
-   **ORM**: Sequelize
-   **Environment Management**: Dotenv

The system architecture is a monolithic design with a separation between frontend and backend services.

<img loading="lazy" src="/public/images/bookmanagement.jpg" alt="Architecture" width="100%">

## Repository Structure

```plaintext
/library-management
├── backend/
│   ├── controllers/        # Logic for handling HTTP requests
│   ├── common/            
│   ├── config/             # Configuration files for database, server, etc.
│   ├── interfaces/         # TypeScript interfaces for data models and APIs
│   ├── models/             # Sequelize models (Book, Author, Category, User)
│   ├── routes/             # API routes for each entity (book, user, etc.)
│   ├── middlewares/        # Middleware for authentication, validation, etc.
│   ├── schemas/            # Validation schemas (e.g., Joi or Yup schemas for request bodies)
│   ├── tests/              # Unit tests and integration tests
│   ├── services/           # Business logic and utility functions
│   ├── utils/              # Helper functions (e.g., date formatters, password encryption)
│   ├── migrations/         # Database migrations for model updates
│   └── seeders/            # Sample data for seeding the database
├── frontend/
│   ├── components/         # React components for UI
│   ├── pages/              # Pages (home, book management, user dashboard, etc.)
│   ├── styles/             # CSS and styling for the frontend (Tailwind or custom styles)
│   ├── public/             # Static files (images, icons, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions (e.g., API request functions, form validation)
│   ├── context/            # React Context for global state management
│   └── assets/             # Assets like fonts, SVGs, or other media
├── .env                    # Environment variables (PostgreSQL credentials, etc.)
├── docker-compose.yml      # Docker Compose configuration for multi-container setup
├── index.ts                # Main entry point for the backend application
├── .gitignore              # Files and directories to be ignored by Git
├── package.json            # Node.js dependencies and scripts for frontend
├── tsconfig.json           # TypeScript configuration file
├── README.md               # Project documentation
└── Dockerfile              # Dockerfile for containerizing the backend
```

## Installation Guide

### Requirements 📋
Before setting up the project, make sure you have the following tools installed:

-   [Docker-Installation](https://docs.docker.com/get-docker/)
-   [Docker-Compose-Installation](https://docs.docker.com/compose/install/)
-   [Node.js (LTS) Installation](https://nodejs.org/en/download)
-   [Git Installation](https://git-scm.com/downloads)
-   [PostgreSQL Installation](https://www.postgresql.org/download/)

### 🔨 Setup

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
The backend will be available at http://localhost:8000, and the frontend will be available at http://localhost:3000.

## 🙌 Contributing to the Project
We welcome contributions to this project! Whether it’s fixing bugs, adding new features, or improving documentation, feel free to submit a pull request. Please follow the guidelines outlined in the CONTRIBUTING.md for submitting contributions.

Bug reports and feature requests can be submitted via GitHub Issues.

## 📝 License
This project is licensed under the terms of the MIT License.
