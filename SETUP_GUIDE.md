# URLShort Setup Guide

## Quick Start (For Testing Without Firebase)

The application is ready to run in development mode. However, to fully test all features, you'll need to set up Firebase.

### 1. Immediate Testing (Limited Features)
```bash
# The app is already running at http://localhost:5173
# You can test the UI components and basic functionality
```

### 2. Full Setup with Firebase (Complete Features)

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" 
3. Name it "url-shortener" or similar
4. Disable Google Analytics (optional)
5. Click "Create project"

#### Step 2: Enable Firebase Services

**Enable Firestore Database:**
1. Go to "Firestore Database" in sidebar
2. Click "Create database"
3. Start in "test mode" 
4. Choose a location (default is fine)
5. Click "Done"

**Enable Authentication:**
1. Go to "Authentication" in sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Click "Email/Password"
5. Enable both options
6. Click "Save"

**Enable Hosting:**
1. Go to "Hosting" in sidebar  
2. Click "Get started"
3. Follow the setup steps (we'll configure this later)

#### Step 3: Get Firebase Configuration
1. Go to "Project Settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" → Web app icon
4. Enter app name: "URLShort"
5. Click "Register app"
6. Copy the configuration object

#### Step 4: Configure Environment
1. Create `.env.local` file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your Firebase config:
```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
```

#### Step 5: Create Admin User
1. Go to "Authentication" → "Users"
2. Click "Add user"
3. Email: `admin@urlshort.com`
4. Password: `admin123`
5. Click "Add user"
6. Click on the created user
7. Go to "Custom claims" tab
8. Add: `{"admin": true}`
9. Click "Save"

#### Step 6: Deploy Firestore Rules
```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init firestore

# Deploy security rules
firebase deploy --only firestore:rules

# Deploy indexes
firebase deploy --only firestore:indexes
```

#### Step 7: Test the Application
1. Restart the development server:
```bash
pnpm run dev
```

2. Test features:
   - ✅ Create short URLs at http://localhost:5173
   - ✅ Admin login at http://localhost:5173/admin
   - ✅ Admin dashboard at http://localhost:5173/admin/dashboard
   - ✅ URL redirects at http://localhost:5173/{shortCode}

## Test Credentials
- **Admin Email**: admin@urlshort.com  
- **Admin Password**: admin123

## Features to Test
1. **URL Shortening**: Enter a long URL and get a shortened version
2. **Copy Functionality**: Copy shortened URLs to clipboard
3. **Admin Login**: Access admin panel with test credentials
4. **URL Management**: View, delete URLs in admin dashboard
5. **Analytics**: See visit counts and statistics
6. **Redirects**: Test that short URLs redirect properly

## Troubleshooting
- If Firebase connection fails, check environment variables
- If admin login fails, verify custom claims are set
- If redirects don't work, check Firestore security rules
- Clear browser cache if experiencing issues

## Production Deployment
When ready for production:
```bash
# Build the app
pnpm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```