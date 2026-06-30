# MERN Task Manager

A full-stack Task Manager web application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application helps users organize and manage their daily tasks with secure authentication, task tracking, filtering, searching, and responsive user interface.

---

## Project Overview

The MERN Task Manager is a productivity application that allows users to create an account, securely log in, and manage personal tasks. Each user can create, update, delete, search, and organize tasks through a clean dashboard.

The project demonstrates the implementation of a complete MERN stack application with REST APIs, JWT authentication, MongoDB database integration, and cloud deployment.

---

## Features

### User Authentication

- User Registration
- User Login
- Secure Password Hashing using bcrypt
- JWT Authentication
- Protected Routes

### Task Management

- Create New Tasks
- Edit Existing Tasks
- Delete Tasks
- Mark Tasks as Completed
- Delete Completed Tasks
- Search Tasks
- Filter Tasks
- Sort Tasks

### Dashboard

- Total Tasks
- Completed Tasks
- Pending Tasks
- Overdue Tasks
- Responsive Statistics Cards

### User Interface

- Responsive Design
- Clean Dashboard
- Toast Notifications
- Mobile-Friendly Layout
- Simple Navigation

---

## Tech Stack

### Frontend

- React.js
- Vite
- Axios
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Database

- MongoDB Atlas

### Deployment

- Frontend – Vercel
- Backend – Render

---

## Folder Structure

```
task-manager/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Ramanath-Behera/task-manager.git
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## Running the Project

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Open:

```
http://localhost:5173
```

---

## Deployment

### Frontend

Deployed on **Vercel**

Frontend URL:

```
Add your Vercel URL here
```

### Backend

Deployed on **Render**

Backend URL:

```
https://task-manager-f0l8.onrender.com
```

### Database

MongoDB Atlas

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Tasks

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Screenshots

Add screenshots of:

- Login Page
- Registration Page
- Dashboard
- Add Task
- Completed Tasks

Example:

```
screenshots/
│── login.png
│── register.png
│── dashboard.png
│── add-task.png
```

---

## Future Enhancements

- Dark Mode
- Task Categories
- Email Notifications
- Due Date Reminders
- Drag and Drop Tasks
- User Profile Management
- Task Labels

---

## Learning Outcomes

This project helped me understand:

- Full Stack MERN Development
- REST API Design
- MongoDB Database Operations
- JWT Authentication
- Password Hashing
- CRUD Operations
- React Context API
- Axios Integration
- Git & GitHub Workflow
- Deployment using Render and Vercel

---

## Author

**Ramanath Behera**

B.Tech Computer Science & Engineering

GitHub:
https://github.com/Ramanath-Behera

---

## License

This project is developed for educational and internship purposes.
