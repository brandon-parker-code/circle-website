#!/bin/bash

# Circle360 Website Deployment Script
# This script automates the deployment process to Firebase Hosting

echo "🚀 Starting Circle360 website deployment..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Please log in to Firebase..."
    firebase login
fi

# Check if firebase.json exists
if [ ! -f "firebase.json" ]; then
    echo "❌ firebase.json not found. Please ensure the file exists."
    exit 1
fi

# Check if .firebaserc exists and has correct project ID
if [ ! -f ".firebaserc" ]; then
    echo "❌ .firebaserc not found. Please create it with your Firebase project ID."
    exit 1
fi

# Check if project ID is still the placeholder
if grep -q "your-firebase-project-id" .firebaserc; then
    echo "⚠️  Please update .firebaserc with your actual Firebase project ID"
    echo "   Replace 'your-firebase-project-id' with your real project ID"
    exit 1
fi

# Build step (if you add build process later)
echo "📦 Preparing files for deployment..."

# Test the build locally (optional)
echo "🧪 Testing build locally..."
firebase serve --only hosting &
SERVER_PID=$!
sleep 5
curl -s http://localhost:5000 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Local test successful"
else
    echo "⚠️  Local test failed, but continuing with deployment..."
fi
kill $SERVER_PID 2>/dev/null

# Deploy to Firebase Hosting
echo "🌐 Deploying to Firebase Hosting..."
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "🎉 Your Circle360 website is now live!"
    echo "📱 You can view it at: https://$(grep -o '"[^"]*"' .firebaserc | head -1 | tr -d '"').web.app"
    echo ""
    echo "📊 Next steps:"
    echo "   1. Set up Google Analytics (see ANALYTICS_SETUP.md)"
    echo "   2. Configure custom domain (optional)"
    echo "   3. Set up continuous deployment (optional)"
    echo ""
    echo "🔗 Firebase Console: https://console.firebase.google.com/project/$(grep -o '"[^"]*"' .firebaserc | head -1 | tr -d '"')/hosting"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi 