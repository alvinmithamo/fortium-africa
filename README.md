# Fortium Africa

A modern web application for Fortium Africa, featuring a responsive frontend built with React and Vite, and a backend powered by Node.js and Express.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Project Overview

Fortium Africa is a web application designed to showcase the company's services, projects, and provide contact information. The application features a modern, responsive design with smooth animations and interactive elements.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or later)
- npm (v8 or later) or yarn
- PostgreSQL (for the database)
- Git

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_BASE_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=3001
   DATABASE_URL=postgresql://username:password@localhost:5432/fortium_africa
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The API will be available at [http://localhost:3001](http://localhost:3001)

## Available Scripts

### Frontend

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

### Backend

- `npm run dev` - Start the development server
- `npm start` - Start the production server

## Project Structure

```
fortium-africa/
├── frontend/               # Frontend React application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main App component
│   │   └── main.tsx       # Application entry point
│   └── package.json       # Frontend dependencies
│
├── backend/               # Backend Node.js application
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── models/       # Database models
│   │   ├── controllers/  # Route controllers
│   │   └── index.js      # Application entry point
│   └── package.json      # Backend dependencies
│
└── README.md             # This file
```

## Environment Variables

### Frontend (`.env` in frontend directory)
- `VITE_API_BASE_URL` - Base URL for API requests

### Backend (`.env` in backend directory)
- `PORT` - Port number for the backend server (default: 3001)
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Application environment (development/production)

## Deployment

### Frontend

1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your hosting provider.

### Backend

1. Ensure all environment variables are set in your production environment.
2. Start the production server:
   ```bash
   cd backend
   npm start
   ```

## Troubleshooting

- **Frontend not connecting to backend**: Ensure the `VITE_API_BASE_URL` in your frontend `.env` file matches the backend server URL.
- **Database connection issues**: Verify your `DATABASE_URL` in the backend `.env` file is correct and the database server is running.
- **Dependency issues**: Try deleting `node_modules` and `package-lock.json` and run `npm install` again.



© 2025 Fortium Africa. All rights reserved.
