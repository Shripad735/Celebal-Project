# Task Management & Expense Tracker Application

A comprehensive Node.js REST API using Express, Mongoose, and JWT for task management and expense tracking with user authentication.

## Features

### Task Management
- User authentication (signup/login) with JWT
- Create, assign, and manage tasks
- Task categorization and project organization
- Deadline tracking and notifications
- Task status management (pending, in-progress, completed)
- Task assignment to users or teams

### Expense Tracking
- Record and categorize expenses
- Expense reporting and analytics
- Budget management
- Expense approval workflows

### Additional Features
- Role-based access control
- Real-time notifications
- RESTful API design
- MongoDB database
- Environment variable support
- CORS enabled

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- Email service for notifications (optional)

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd task-expense-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and update values.
   ```bash
   cp .env.example .env
   ```

4. **Start MongoDB** (if not already running):
   ```bash
   mongod
   ```

5. **Run the server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

## API Endpoints

### Authentication
| Method | Endpoint         | Description              |
|--------|-----------------|--------------------------|
| POST   | `/auth/register` | User registration        |
| POST   | `/auth/login`    | User login               |
| GET    | `/auth/profile`  | Get user profile         |

### Tasks
| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| POST   | `/tasks`             | Create a new task              |
| GET    | `/tasks`             | Get all tasks (filtered)       |
| GET    | `/tasks/:id`         | Get a single task by ID        |
| PUT    | `/tasks/:id`         | Update a task by ID            |
| DELETE | `/tasks/:id`         | Delete a task by ID            |
| PUT    | `/tasks/:id/assign`  | Assign task to user            |
| PUT    | `/tasks/:id/status`  | Update task status             |

### Categories
| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| POST   | `/categories`        | Create a new category          |
| GET    | `/categories`        | Get all categories             |
| PUT    | `/categories/:id`    | Update a category              |
| DELETE | `/categories/:id`    | Delete a category              |

### Expenses
| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| POST   | `/expenses`          | Create a new expense           |
| GET    | `/expenses`          | Get all expenses (filtered)    |
| GET    | `/expenses/:id`      | Get a single expense by ID     |
| PUT    | `/expenses/:id`      | Update an expense by ID        |
| DELETE | `/expenses/:id`      | Delete an expense by ID        |

### Notifications
| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/notifications`     | Get user notifications         |
| PUT    | `/notifications/:id` | Mark notification as read      |

## Data Models

### User Schema
```json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required)",
  "role": "string (admin, manager, user)",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Task Schema
```json
{
  "title": "string (required)",
  "description": "string",
  "assignedTo": "ObjectId (User)",
  "assignedBy": "ObjectId (User)",
  "category": "ObjectId (Category)",
  "deadline": "date",
  "status": "string (pending, in-progress, completed)",
  "priority": "string (low, medium, high)",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Category Schema
```json
{
  "name": "string (required)",
  "description": "string",
  "color": "string",
  "createdBy": "ObjectId (User)",
  "createdAt": "date"
}
```

### Expense Schema
```json
{
  "title": "string (required)",
  "amount": "number (required)",
  "category": "string (required)",
  "description": "string",
  "receipt": "string (file path)",
  "createdBy": "ObjectId (User)",
  "status": "string (pending, approved, rejected)",
  "createdAt": "date"
}
```

## Environment Variables

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskexpensetracker
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## Screenshots

![Authentication](Screenshots/Screenshot_Auth.png)
![Task Management](Screenshots/Screenshot_Tasks.png)
![Expense Tracking](Screenshots/Screenshot_Expenses.png)
![Notifications](Screenshots/Screenshot_Notifications.png)


