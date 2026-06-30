# Task Manager — MERN Stack

A full-stack task management web application built with the MERN stack as part of my internship at InternsElite.

## Features

- User registration and login with JWT authentication
- Add, edit, delete tasks
- Mark tasks as complete or pending
- Filter tasks — All / Pending / Completed
- Search tasks by title or description
- Sort tasks by date, priority, or due date
- Task statistics dashboard (Total, Completed, Pending, Overdue)
- Delete all completed tasks at once

## Tech Stack

**Frontend**
- React + Vite
- React Router DOM
- Axios
- Context API (for auth state)
- Plain CSS

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (password hashing)
- dotenv

## Project Structure

```
task-manager/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── EditTaskModal.jsx
    │   │   └── Toast.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

## Setup Instructions

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd task-manager
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

App runs at: `http://localhost:5173`
API runs at: `http://localhost:5000`

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user (protected) |

### Tasks (all protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks (supports ?status, ?search, ?sort) |
| GET | /api/tasks/stats | Get task statistics |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| PATCH | /api/tasks/:id/toggle | Toggle complete/pending |
| DELETE | /api/tasks/completed | Delete all completed tasks |

## Deployment

- Frontend: Vercel / Netlify
- Backend: Render / Railway
- Database: MongoDB Atlas

## Mentor

Alok Maddheshiya — InternsElite MERN Stack Training Program (May 2026)
