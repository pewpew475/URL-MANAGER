# URLShort - Modern URL Shortener

A professional URL shortening service built with React, TypeScript, Tailwind CSS, and Firebase. Transform long URLs into short, memorable links with robust analytics and secure admin management features. Deployed on Vercel for optimal performance and reliability.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Furlshort)

## 🌟 Features

### Public Features
- **URL Shortening**: Convert long URLs into short, memorable links
- **Instant Redirect**: Fast redirection to original URLs
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Copy to Clipboard**: Easy sharing with one-click copying

### Admin Features
- **Admin Dashboard**: Secure authentication and management panel
- **URL Management**: View, delete, and manage all shortened URLs
- **Real-time Analytics**: Track click counts and visit statistics
- **Live Updates**: Real-time data updates without page refresh

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui, Radix UI
- **Backend**: Firebase (Firestore, Authentication, Functions, Hosting)
- **Routing**: React Router v6
- **State Management**: React Context + Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or pnpm
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project

## 🔧 Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd /workspace/shadcn-ui

# Install dependencies
pnpm install
```

### 2. Firebase Project Setup

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Follow the setup wizard

2. **Enable Required Services**:
   - **Firestore Database**: Go to Firestore Database → Create database → Start in test mode
   - **Authentication**: Go to Authentication → Sign-in method → Enable Email/Password
   - **Firebase Hosting**: Go to Hosting → Get started

3. **Create Admin User**:
   - Go to Authentication → Users → Add user
   - Email: `admin@urlshort.com`
   - Password: `admin123`
   - After creation, go to the user and add custom claims:
   ```json
   {
     "admin": true
   }
   ```

### 3. Configure Firebase

1. **Get Firebase Config**:
   - Go to Project Settings → General → Your apps
   - Click "Add app" → Web
   - Copy the config object

2. **Set Environment Variables**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your Firebase config
   VITE_APP_FIREBASE_API_KEY=your-api-key
   VITE_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_APP_FIREBASE_PROJECT_ID=your-project-id
   VITE_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_APP_FIREBASE_APP_ID=your-app-id
   ```

3. **Initialize Firebase in Project**:
   ```bash
   # Login to Firebase
   firebase login
   
   # Initialize Firebase project
   firebase init
   
   # Select: Firestore, Functions, Hosting
   # Choose existing project
   # Accept defaults for Firestore rules and indexes
   # Accept defaults for Functions
   # Set public directory to 'dist'
   # Configure as single-page app: Yes
   ```

### 4. Deploy Firestore Rules and Indexes

```bash
# Deploy Firestore security rules
firebase deploy --only firestore:rules

# Deploy Firestore indexes
firebase deploy --only firestore:indexes
```

## 🚀 Development

### Local Development
```bash
# Start development server
pnpm run dev

# The app will be available at http://localhost:5173
```

### Local Development with Firebase Emulators (Optional)
```bash
# Start Firebase emulators
firebase emulators:start

# In another terminal, start the React app
pnpm run dev
```

## 🏗 Building for Production

```bash
# Build the application
pnpm run build

# Preview the production build locally
pnpm run preview
```

## 🚀 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy to Vercel
vercel

# For production deployment
vercel --prod
```

### Environment Setup in Vercel
1. Go to your project settings in Vercel dashboard
2. Add the following environment variables:
   - All Firebase configuration variables
   - `NODE_ENV=production`

### Alternative Deployment Methods
You can also deploy by:
1. Connecting your GitHub repository to Vercel
2. Enabling automatic deployments
3. Configuring build settings in `vercel.json`

## 📱 Usage

### For Users
1. Visit the homepage
2. Enter a long URL in the input field
3. Click "Shorten URL"
4. Copy and share the generated short URL
5. The short URL will redirect visitors to the original URL

### For Admins
1. Go to `/admin`
2. Login with admin credentials:
   - Email: `admin@urlshort.com`
   - Password: `admin123`
3. Access the admin dashboard to:
   - View all shortened URLs
   - See click statistics
   - Delete URLs
   - Monitor real-time analytics

## 🔒 Security Features

- **Firestore Security Rules**: Restrict admin operations to authenticated admin users
- **Input Validation**: URL format validation and sanitization
- **Rate Limiting**: Prevent abuse with configurable rate limits
- **Firebase Authentication**: Secure admin access with JWT tokens
- **Custom Claims**: Role-based access control for admin features

## 📊 Analytics & Monitoring

- **Visit Tracking**: Automatic click count tracking
- **Real-time Updates**: Live dashboard updates
- **Admin Analytics**: Comprehensive URL performance metrics
- **Error Handling**: Graceful error handling and user feedback

## 🔧 Configuration

### Environment Variables
- `VITE_APP_FIREBASE_API_KEY`: Firebase API key
- `VITE_APP_FIREBASE_AUTH_DOMAIN`: Firebase Auth domain
- `VITE_APP_FIREBASE_PROJECT_ID`: Firebase project ID
- `VITE_APP_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
- `VITE_APP_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `VITE_APP_FIREBASE_APP_ID`: Firebase app ID

### Configuration Files
- `vercel.json`: Vercel deployment configuration
- `firebase.json`: Firebase project configuration
- `firestore.rules`: Database security rules
- `firestore.indexes.json`: Database indexes for performance
- `.env.production`: Production environment variables
- `.vercelignore`: Files to exclude from Vercel deployment

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Errors**:
   - Verify environment variables are correct
   - Check Firebase project settings
   - Ensure services are enabled in Firebase console

2. **Admin Access Issues**:
   - Verify admin user has custom claims: `{"admin": true}`
   - Check Firestore security rules are deployed
   - Clear browser cache and try again

3. **URL Redirect Issues**:
   - Check Firestore security rules allow public reads for redirects
   - Verify URL exists and is active in database
   - Check browser network tab for errors

4. **Build Errors**:
   - Run `pnpm install` to ensure dependencies are installed
   - Check TypeScript errors with `pnpm run lint`
   - Verify all environment variables are set

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Review Firebase console logs
3. Verify all environment variables are correctly set
4. Ensure Firebase services are properly configured

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Check the troubleshooting section
- Review Firebase documentation
- Open an issue in the repository