# EmployEase - Job Hiring Platform

EmployEase is a full-stack web application designed to connect job seekers with employers, streamlining the hiring process and empowering both parties. The platform offers features for job posting, application management, user authentication, profile editing, and more.


## Features

- **User Authentication:** Signup and login for job seekers and employers.
- **Profile Management:** Edit and view user profiles, including company info for employers.
- **Job Posting:** Employers can create, view, and delete job listings.
- **Job Application:** Job seekers can apply for jobs and upload resumes.
- **Dashboard:** Personalized dashboard for job seekers and employers.
- **Support Center:** FAQ and contact form for user support.
- **Responsive UI:** Built with React and Bootstrap for modern look and feel.

## Technologies Used

- **Frontend:** React.js, Bootstrap, Vite
- **Backend:** Node.js, Express, MySQL, JWT Auth, bcryptjs
- **Database:** MySQL (see [`misc/Database.sql`](misc/Database.sql))
- **Other:** ESLint, dotenv, cookie-parser

## Getting Started

### Prerequisites

- Node.js & npm
- MySQL

### Setup

#### 1. Clone the repository

```sh
git clone https://github.com/Praneet2126/employease.git
cd employease
```

#### 2. Backend Setup

- Configure your MySQL credentials in `backend/.env`:

  ```
  DB_HOST=localhost
  DB_USER=your_mysql_user
  DB_PASS=your_mysql_password
  DB_NAME=your_database_name
  JWT_SECRET=your_jwt_secret
  ```

- Install dependencies and start the backend server:

  ```sh
  cd backend
  npm install
  npm start
  ```

#### 3. Frontend Setup

- Install dependencies and start the frontend dev server:

  ```sh
  cd frontend
  npm install
  npm run dev
  ```

- The frontend will run at [http://localhost:5173](http://localhost:5173).

#### 4. Database Setup

- Import the schema from [`misc/Database.sql`](misc/Database.sql) into your MySQL database.

#### 5. Access the App

- Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Signup:** Register as a job seeker or employer.
- **Login:** Access your dashboard and features.
- **Profile:** Edit your personal or company information.
- **Jobs:** Browse, apply, or manage job listings.
- **Support:** Get help via the support center.


## Contributing

Contributions are welcome! Please open issues or submit pull requests.
