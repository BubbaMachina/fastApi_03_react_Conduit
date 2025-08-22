# Conduit MVP – FastAPI & React

This is a minimal Medium/Conduit clone built with a FastAPI backend and a React (Vite) frontend.

## Features

- User registration & login (JWT auth)
- Create, list, and delete articles
- User profiles with follow/unfollow
- SQLite database (local file)
- Material UI for frontend styling

---

## Backend (FastAPI)

### Setup

1. **Create a virtual environment:**

   ```sh
   cd ./backend
   python -m venv venv
   ```

2. **Activate the virtual environment:**

   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

3. **Install dependencies:**

   ```sh
   pip install -r requirements.txt
   ```

4. **Run the backend server:**

   ```sh
   cd backend
   python main.py
   ```

   The API will be available at [http://localhost:8000](http://localhost:8000).

---

## Frontend (React + Vite)

### Setup

1. **Install dependencies:**

   ```sh
   cd frontend
   npm install
   ```

2. **Start the development server:**

   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Usage

- Register a new user or log in.
- Create, view, and delete your own articles.
- Visit user profiles and follow/unfollow users.

---

## Project Structure

```
backend/
  main.py
  auth.py
  crud.py
  database.py
  models.py
  profile.py
  requirements.txt
  schemas.py
  utils.py
frontend/
  src/
    App.jsx
    AuthForm.jsx
    components/
    pages/
  package.json
  vite.config.js
```

---

## Notes

- The backend uses SQLite by default (`articles.db`).
- JWT secret is hardcoded for demo purposes—**do not use in production**.
- CORS is configured for local development.

---

## License