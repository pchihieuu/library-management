# Library Management System  

The Library Management System is a full-fledged application built to manage library operations. The system includes features for managing books, authors, categories, and users, with capabilities such as borrowing and returning books, as well as tracking borrowing history.

## Table of Contents

1. [System Overview](#👩‍💻-System-Overview)
2. [Repository Structure](#Repository-Structure)
3. [Installation Guide](#Installation-Guide)
    - [Requirements](#Requirements-📋)
    - [Setup](#🔨-setup)

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
