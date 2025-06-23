# Circle360 Website Deployment Guide

## Firebase Hosting Deployment

Since you're already using Firebase/Firestore for your app, deploying to Firebase Hosting is the perfect solution. It provides fast, secure hosting with global CDN and integrates seamlessly with your existing Firebase project.

## Prerequisites

1. **Firebase CLI** - Install if you haven't already
2. **Existing Firebase Project** - Your current project with Firestore
3. **Node.js** - For Firebase CLI

## Step-by-Step Deployment

### 1. Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase Hosting

```bash
firebase init hosting
```

**When prompted:**
- Select your existing Firebase project
- Use current directory as public directory: `Yes`
- Configure as single-page app: `Yes`
- Don't overwrite index.html: `No`

### 4. Update Project Configuration

Edit `.firebaserc` and replace `your-firebase-project-id` with your actual Firebase project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 5. Configure Firebase Hosting

The `firebase.json` file is already configured with:
- **Public directory**: Current directory (`.`)
- **Single-page app routing**: All routes redirect to index.html
- **Caching headers**: Optimized for performance
- **File exclusions**: Ignores unnecessary files

### 6. Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

### 7. Verify Deployment

After deployment, you'll get a URL like:
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project/hosting
Hosting URL: https://your-project-id.web.app
```

## Custom Domain Setup (Optional)

### 1. Add Custom Domain

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Enter your domain (e.g., `circle360.com`)
4. Follow the DNS configuration instructions

### 2. DNS Configuration

Add these records to your domain provider:

```
Type: A
Name: @
Value: 151.101.1.195

Type: A  
Name: @
Value: 151.101.65.195

Type: CNAME
Name: www
Value: your-project-id.web.app
```

### 3. SSL Certificate

Firebase automatically provides SSL certificates for custom domains.

## Continuous Deployment (Optional)

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install Firebase CLI
      run: npm install -g firebase-tools
    
    - name: Deploy to Firebase
      run: firebase deploy --only hosting --token "${{ secrets.FIREBASE_TOKEN }}"
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

### Generate Firebase Token

```bash
firebase login:ci
```

Add the token to GitHub Secrets as `FIREBASE_TOKEN`.

## Performance Optimization

### 1. Image Optimization

Consider optimizing your screenshots:
- Use WebP format for better compression
- Compress PNG/JPEG files
- Implement lazy loading for images

### 2. Caching Strategy

The `firebase.json` includes optimal caching:
- CSS/JS files: 1 year cache
- Images: 1 year cache
- HTML: No cache (for updates)

### 3. Compression

Firebase Hosting automatically:
- Compresses text files (HTML, CSS, JS)
- Serves optimized images
- Uses HTTP/2 for faster loading

## Monitoring & Analytics

### 1. Firebase Analytics Integration

Since you're using Firebase, consider adding Firebase Analytics:

```html
<!-- Add to index.html head section -->
<script type="module">
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
  import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js'

  const firebaseConfig = {
    // Your Firebase config
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
```

### 2. Performance Monitoring

Firebase provides built-in performance monitoring:
- Page load times
- Network requests
- User experience metrics

## Security Considerations

### 1. Security Headers

Add security headers to `firebase.json`:

```json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          }
        ]
      }
    ]
  }
}
```

### 2. Content Security Policy

Consider adding CSP headers for additional security.

## Troubleshooting

### Common Issues

1. **Deployment fails**
   - Check Firebase CLI version: `firebase --version`
   - Verify project ID in `.firebaserc`
   - Ensure you're logged in: `firebase login`

2. **404 errors on refresh**
   - Verify single-page app configuration in `firebase.json`
   - Check rewrite rules are correct

3. **Slow loading**
   - Optimize image sizes
   - Check caching headers
   - Use Firebase CDN locations

### Useful Commands

```bash
# Test locally
firebase serve

# View hosting status
firebase hosting:channel:list

# Rollback deployment
firebase hosting:clone live:previous live:current

# View deployment history
firebase hosting:releases:list
```

## Cost Considerations

Firebase Hosting pricing:
- **Free tier**: 10GB storage, 360MB/day transfer
- **Paid tier**: $0.026/GB storage, $0.15/GB transfer

For most websites, the free tier is sufficient.

## Next Steps

1. **Deploy your website** using the steps above
2. **Set up custom domain** if desired
3. **Configure analytics** (Google Analytics or Firebase Analytics)
4. **Monitor performance** using Firebase Console
5. **Set up continuous deployment** for automatic updates

## Integration with Your App

Since you're using Firestore, you can:
- Share authentication between app and website
- Use the same Firebase project for both
- Implement seamless user experience
- Track cross-platform user behavior

---

**Need help?** Check out the [Firebase Hosting documentation](https://firebase.google.com/docs/hosting) or [Firebase community](https://firebase.google.com/community). 