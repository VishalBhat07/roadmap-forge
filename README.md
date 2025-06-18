# 🚀 RoadMapForge

An interactive learning roadmap platform to help users visualize and track their educational journeys in tech and beyond. Designed for learners, educators, and community contributors.

The project is live at: [https://roadmap-forge-frontend.vercel.app](https://roadmap-forge-frontend.vercel.app)

## 📌 Project Overview

RoadMapForge is a dynamic, user-friendly web application that allows users to explore, follow, and create learning roadmaps. It provides a visual interface to mark progress, track milestones, and receive recommendations.

### ✨ Key Features

- Interactive roadmap UI with progress tracking
- Fine tuned roadmaps
- Community-driven
- Authentication & user profiles
- Responsive, modern UI

### 🎯 Target Audience

- Students & self-learners
- Educators & mentors
- Bootcamp participants
- Open-source enthusiasts

## 🛠️ Technology Stack

| Category        | Technology       | Version | Purpose                     |
| --------------- | ---------------- | ------- | --------------------------- |
| **Frontend**    | React.js         | v18+    | User interface framework    |
|                 | React Router DOM | Latest  | Client-side routing         |
|                 | Axios            | Latest  | HTTP client for API calls   |
|                 | Framer Motion    | Latest  | Animations and transitions  |
|                 | CSS Modules      | Latest  | Component-scoped styling    |
| **Backend**     | Node.js          | v18+    | JavaScript runtime          |
|                 | Express.js       | v4.18+  | Web application framework   |
| **Database**    | MongoDB          | v6+     | NoSQL database              |
|                 | Mongoose         | Latest  | Object modeling for MongoDB |
| **Security**    | bcrypt           | Latest  | Password hashing            |
| **Development** | nodemon          | Latest  | Development server          |
|                 | ESLint           | Latest  | Code linting                |
|                 | Prettier         | Latest  | Code formatting             |
| **Environment** | dotenv           | Latest  | Environment variables       |

## 📦 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or above)
- **npm** or **yarn**
- **MongoDB** (installed locally or Atlas account)
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/VishalBhat07/roadmap-forge.git
cd roadmapforge
```

### 2. Setup Environment Variables

Create `.env` files in both `/backend` and `/frontend` directories using the templates below.

### 3. Install Dependencies

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 4. Run the Application Locally

Open two terminal windows:

```bash
# Terminal 1 - Backend server
cd backend
npm start
# or for development with nodemon
nodemon app.js

# Terminal 2 - Frontend development server
cd frontend
npm run dev
```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080`

---

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/roadmapforge
ADMIN_EMAIL=your_email_id
ADMIN_EMAIL_PASSWORD =your_email_app_password
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_BACKENDURL=http://localhost:8080
VITE_DISCORD_SERVER_ID=your_discord_server_id
```

## 📡 API Documentation

### Base URL

```
http://localhost:8080
```

### Endpoints

#### Authentication Routes (`/auth`)

| Method | Endpoint                 | Description                     | Body Parameters                 |
| ------ | ------------------------ | ------------------------------- | ------------------------------- |
| POST   | `/auth/register`         | Register new user               | `username`, `email`, `password` |
| POST   | `/auth/login`            | Login user                      | `username`, `password`          |
| POST   | `/auth/verificationcode` | Generate OTP for password reset | `userEmail`                     |
| POST   | `/auth/verifycode`       | Verify OTP                      | `userEmail`, `verificationCode` |
| POST   | `/auth/resetpassword`    | Reset password                  | `userEmail`, `newPassword`      |

#### User Routes (`/user`)

| Method | Endpoint                 | Description                | Body Parameters               |
| ------ | ------------------------ | -------------------------- | ----------------------------- |
| POST   | `/user/uploadpic`        | Upload profile picture     | `image` (file), `user` (JSON) |
| GET    | `/user/images/:username` | Get user's profile picture | -                             |

#### Roadmap Routes (`/roadmap`)

| Method | Endpoint                                           | Description                  | Body/Query Parameters                    |
| ------ | -------------------------------------------------- | ---------------------------- | ---------------------------------------- |
| POST   | `/roadmap/enroll`                                  | Enroll in roadmap            | `roadmapTitle`, `username`               |
| GET    | `/roadmap/roadmaps/:id`                            | Get user's enrolled roadmaps | `id` (username)                          |
| POST   | `/roadmap/userProgress`                            | Add initial progress         | `username`, `roadmap`, `topicsCompleted` |
| POST   | `/roadmap/updateProgress`                          | Update topic progress        | `username`, `roadmap`, `topic`           |
| GET    | `/roadmap/fetchProgress/:username/:roadmap/:topic` | Get topic completion status  | -                                        |
| GET    | `/roadmap/fetchTopics/:username/:roadmap`          | Get all topics for a roadmap | -                                        |

#### Gemini Routes (`/gemini`)

| Method | Endpoint                           | Description              | Path Parameters    |
| ------ | ---------------------------------- | ------------------------ | ------------------ |
| GET    | `/gemini/response/:roadmap/:title` | Get AI-generated content | `roadmap`, `title` |

#### Post Routes (`/post`)

| Method | Endpoint       | Description     | Body Parameters |
| ------ | -------------- | --------------- | --------------- |
| POST   | `/post/create` | Create new post | Post object     |
| GET    | `/post/posts`  | Get all posts   | -               |

### Error Handling

Standard HTTP status codes are used:

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Internal Server Error

## 🗄️ Database Schema

#### Users

```javascript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledRoadmaps: [{
    title: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }],
  forgotPasswordCode: { type: String, default: null },
  forgotPasswordCodeExpires: { type: Date }
}
```

#### Course Progress

```javascript
{
  username: { type: String, required: true },
  roadmap: { type: String, required: true },
  topicsCompleted: [{
    topicName: { type: String, required: true },
    completed: { type: Boolean, required: true }
  }]
}
```

#### Posts

```javascript
{
  title: { type: String },
  content: { type: String },
  author: {
    userId: ObjectId,
    username: String
  },
  category: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  status: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  attachments: [{
    name: String,
    fileUrl: String,
    fileType: String,
    size: Number
  }],
  pinned: Boolean,
  votedBy: [ObjectId],
  lastActivity: Date
}
```

#### Topic Content

```javascript
{
  roadmap: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  contentJSON: { type: Array, required: true }
}
```

#### Topic Content

```javascript
{
  roadmap: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  contentJSON: { type: Array, required: true }
}
```

#### Images

```javascript
{
  username: { type: String, required: true, unique: true },
  image: {
    data: Buffer,
    contentType: String
  }
}
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Guidelines

- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Branch Naming Convention

- Features: `feature/description`
- Bug fixes: `fix/description`
- Documentation: `docs/description`

### Contribution Process

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add: amazing new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

### Code Review Process

- All PRs must pass CI checks
- Require approval from maintainers

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
