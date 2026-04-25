# 🌉 TaskBridge

> **A collaborative task management system with user isolation, real-time status updates, and contextual task highlighting.**

---

## 🔗 Live Links

- **Frontend (Vercel):** [https://taskbridge-app-kappa.vercel.app/](https://taskbridge-app-kappa.vercel.app/) 
- **Backend (Render):** [https://taskbridge-api-r9xd.onrender.com](https://taskbridge-api-r9xd.onrender.com) 

---

## ✨ Core Features

- 🔒 **Secure Authentication**: Robust user authentication using JWT and bcrypt for secure password hashing.
- 📝 **Full CRUD Operations**: Create, Read, Update, and Delete tasks seamlessly.
- 🛡️ **User Isolation**: Data privacy enforced—users can only view and modify their own tasks.
- 🌙 **Dark Mode Toggle**: Persistent theme switching (Light/Dark) for optimal viewing comfort.
- ⏰ **Contextual Task Due Dates**: Intelligent deadline tracking with red border highlighting for overdue tasks and visual countdowns.

---

## 📸 Screenshots


![Dashboard Preview]<img width="1709" height="981" alt="Screenshot 2026-04-25 at 10 32 33 AM" src="https://github.com/user-attachments/assets/0bd4619d-1c4d-4805-a24c-a72216a038b9" />


![Dark Mode Preview]<img width="1709" height="981" alt="Screenshot 2026-04-25 at 10 33 06 AM" src="https://github.com/user-attachments/assets/ed2ec803-5477-45c9-8b9b-5b23399573e3" />


---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Lightning-fast development environment and optimized production builds.
- **Tailwind CSS**: Utility-first styling for rapid and responsive UI development.

### Backend
- **Node.js**: Asynchronous event-driven JavaScript runtime.
- **Express.js**: Fast, unopinionated, minimalist web framework.

### Database
- **MongoDB (Atlas)**: Fully managed cloud NoSQL database for flexible data storage.

---

## 📖 API Documentation

*Note: All `/api/tasks` endpoints require a valid JWT passed in the `Authorization` header as a Bearer Token.*

| Endpoint | Method | Description | Requires Auth |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Register a new user | No |
| `/api/auth/login` | `POST` | Authenticate user & get token | No |
| `/api/tasks` | `GET` | Fetch all tasks for the logged-in user | Yes |
| `/api/tasks` | `POST` | Create a new task | Yes |
| `/api/tasks/:id` | `PUT` | Update an existing task | Yes |
| `/api/tasks/:id` | `DELETE` | Delete a specific task | Yes |

---

## ⚙️ Local Setup

Follow these steps to get the project running locally.

### 1. Clone the repository
```bash
git clone https://github.com/ashwanisingh011/TaskBridge.git
cd TaskBridge
```

### 2. Backend Setup
```bash
cd backend
npm install
# Configure your .env file here (see below)
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
# Configure your .env file here (see below)
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in both the `backend` and `frontend` directories using the following templates:

### Backend (`backend/.env`)
```env
PORT=5001
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5001/api
```

---

## 🗂️ Project Structure

```text
TaskBridge/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route logic and request handling
│   │   ├── middleware/       # JWT verification and error handling
│   │   ├── models/           # Mongoose schemas (User, Task)
│   │   ├── routes/           # Express API routes (auth.js, tasks.js)
│   │   └── server.js         # Entry point for the Node.js application
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── assets/           # Static files and images
    │   ├── components/       # Reusable React components (TaskCard, Navbar, etc.)
    │   ├── context/          # React Context (Auth, Theme)
    │   ├── pages/            # Application views (Dashboard, Login, Register)
    │   ├── services/         # API integration (Axios calls)
    │   ├── App.jsx           # Root component and routing
    │   └── main.jsx          # React DOM rendering
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    └── .env
```
