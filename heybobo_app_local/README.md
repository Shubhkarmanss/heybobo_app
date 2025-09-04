# Heybobo - Local Fullstack App (Frontend + Backend)

This package contains a ready-to-run local fullstack project:
- `backend/` - Node.js + Express + MongoDB + JWT auth
- `frontend/` - React + Vite + Tailwind + OpenWeather integration

## Steps to run locally (step-by-step)

### 1) Prerequisites
- Install Node.js (v18+ recommended): https://nodejs.org/
- Create a MongoDB Atlas free cluster or run local MongoDB and get the connection URI.

### 2) Backend setup
1. Open terminal and go to the backend folder:
   ```bash
   cd backend
   ```
2. Copy `.env.example` to `.env` and edit values (MONGODB_URI, JWT_SECRET):
   ```bash
   cp .env.example .env
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```
Backend will start at `http://localhost:8080` (or PORT from your .env).

### 3) Frontend setup
1. Open a new terminal and go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Copy `.env.example` to `.env` and set `VITE_OPENWEATHER_API_KEY` (get an API key from https://openweathermap.org/api):
   ```bash
   cp .env.example .env
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```
Open the local URL shown by Vite (usually http://localhost:5173).

### 4) Quick usage
1. Create an account (signup).
2. Login.
3. Add tasks in the input. They will be stored in MongoDB and appear in UI.
4. Click quick buttons to see logs in browser console.
