# 🚀 Wheller - Advanced Task Management Platform

A modern, scalable, and beautiful task management application built with Next.js, Node.js, Express, and MongoDB. Features a rich, colorful UI with comprehensive authentication, task CRUD operations, and a responsive design.

## ✨ Features

### Frontend (Next.js + TypeScript)
- 🎨 **Rich, Modern UI** - Beautiful gradient colors, glassmorphism effects, and smooth animations
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🔐 **Authentication** - Secure login/register with JWT tokens
- 📊 **Dashboard** - Beautiful dashboard with task statistics and management
- ✅ **Task Management** - Full CRUD operations with status updates and priority levels
- 🔍 **Search & Filter** - Advanced search and filtering by status and priority
- 👤 **Profile Management** - Update user profile information
- 🎭 **Animations** - Smooth animations using Framer Motion

### Backend (Node.js + Express)
- 🔒 **JWT Authentication** - Secure token-based authentication
- 🛡️ **Password Hashing** - Bcrypt for secure password storage
- ✅ **Input Validation** - Express-validator for request validation
- 📦 **Modular Structure** - Organized routes and middleware
- 🔌 **RESTful API** - Clean REST API design
- 🗄️ **MongoDB Integration** - Mongoose ODM for database operations
- ⚡ **Error Handling** - Comprehensive error handling

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **js-cookie** - Cookie management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens
- **Bcrypt.js** - Password hashing
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-intern-task
   ```

2. **Set up the Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env file with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Set up the Frontend**
   ```bash
   cd frontend-proj
   npm install
   cp .env.example .env.local
   # Edit .env.local if needed (API URL defaults to http://localhost:5000/api)
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Environment Variables

#### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/wheller
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
frontend-intern-task/
├── server/                 # Backend server
│   ├── models/            # Mongoose models
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js
│   ├── index.js           # Server entry point
│   └── package.json
│
└── frontend-proj/         # Frontend application
    ├── app/               # Next.js app directory
    │   ├── dashboard/     # Dashboard page
    │   ├── login/         # Login page
    │   ├── register/      # Register page
    │   ├── layout.tsx     # Root layout
    │   ├── page.tsx       # Landing page
    │   └── globals.css    # Global styles
    ├── utils/             # Utility functions
    │   └── api.js         # API client
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks (Protected, supports query params: status, priority, search)
- `GET /api/tasks/:id` - Get a single task (Protected)
- `POST /api/tasks` - Create a new task (Protected)
- `PUT /api/tasks/:id` - Update a task (Protected)
- `DELETE /api/tasks/:id` - Delete a task (Protected)

## 🔒 Security Features

- ✅ Password hashing with bcrypt (12 salt rounds)
- ✅ JWT token-based authentication
- ✅ Token expiration (7 days)
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Protected routes middleware
- ✅ User authorization checks

## 🎨 UI/UX Features

- **Rich Color Palette** - Vibrant gradients and neon accents
- **Glassmorphism** - Modern glassmorphic card designs
- **Smooth Animations** - Framer Motion animations throughout
- **Responsive Design** - Mobile-first approach
- **Dark Theme** - Beautiful dark theme with colorful accents
- **Interactive Elements** - Hover effects and transitions
- **Toast Notifications** - User-friendly feedback

## 📈 Scalability Considerations

### Current Architecture
- Modular route structure for easy expansion
- Separate concerns (routes, models, middleware)
- Environment-based configuration
- Error handling middleware

### Production Recommendations
1. **Database**
   - Use MongoDB Atlas for managed database
   - Implement database indexing
   - Set up connection pooling

2. **Backend**
   - Add rate limiting (express-rate-limit)
   - Implement request logging (Winston)
   - Add API documentation (Swagger)
   - Set up monitoring (PM2, New Relic)
   - Use Redis for session storage
   - Implement caching strategies

3. **Frontend**
   - Add code splitting
   - Implement service workers for PWA
   - Add error boundary components
   - Optimize images (Next.js Image)
   - Implement lazy loading

4. **Security**
   - Add helmet.js for security headers
   - Implement CSRF protection
   - Add input sanitization (DOMPurify)
   - Set up HTTPS
   - Regular security audits

5. **Testing**
   - Unit tests (Jest)
   - Integration tests
   - E2E tests (Playwright/Cypress)
   - Load testing

6. **DevOps**
   - CI/CD pipeline (GitHub Actions)
   - Docker containerization
   - Kubernetes orchestration
   - Cloud deployment (Vercel/Netlify for frontend, AWS/DigitalOcean for backend)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ for productivity and scalability.

---

**Wheller** - Where tasks meet excellence ✨
