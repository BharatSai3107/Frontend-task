# 🚀 Wheller - Quick Start Guide

## Quick Setup (5 minutes)

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
MONGO_URI=mongodb://localhost:27017/wheller
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend-proj
npm install
```

Start the frontend:
```bash
npm run dev
```

### 3. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## First Steps

1. Visit http://localhost:3000
2. Click "Get Started" or "Register"
3. Create your account
4. Start managing your tasks!

## MongoDB Setup

### Option 1: Local MongoDB
Install MongoDB locally and run:
```bash
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update `MONGO_URI` in `.env` with your connection string

## Troubleshooting

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: `npm run dev -- -p 3001`

### MongoDB Connection Error
- Ensure MongoDB is running (if local)
- Check your `MONGO_URI` in `.env`
- Verify network access (if using Atlas)

### Module Not Found Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Need Help?

Check the main [README.md](README.md) for detailed documentation.

