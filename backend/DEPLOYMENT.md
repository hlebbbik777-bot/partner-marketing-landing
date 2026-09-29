# Deployment Options

## Free Hosting Options

### 1. Render (Recommended)
- Free tier available
- Easy deployment from GitHub
- Automatic SSL
- Deploy at: https://render.com/

**Steps:**
1. Push code to GitHub
2. Sign up at render.com
3. Connect GitHub repository
4. Create "Web Service"
5. Set build command: `cd backend && npm install`
6. Set start command: `cd backend && npm start`
7. Add environment variables from `.env.example`
8. Deploy!

### 2. Railway
- Free tier available
- Simple deployment
- Deploy at: https://railway.app/

**Steps:**
1. Push code to GitHub
2. Sign up at railway.app
3. Import from GitHub
4. Add environment variables
5. Deploy!

### 3. Vercel
- Free tier available
- Great for frontend + backend
- Deploy at: https://vercel.com/

**Steps:**
1. Push code to GitHub
2. Sign up at vercel.com
3. Import repository
4. Configure root directory as `backend`
5. Add environment variables
6. Deploy!

### 4. Glitch
- Free and simple
- Good for testing
- Deploy at: https://glitch.com/

**Steps:**
1. Create new project on glitch.com
2. Copy backend files
3. Add .env file with environment variables
4. The project will be live immediately

## Environment Variables for Production

When deploying, make sure to set these environment variables:

```
PORT=5000
NODE_ENV=production
SESSION_SECRET=<generate-secure-random-string>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=https://your-domain.com/auth/google/callback
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
GITHUB_CALLBACK_URL=https://your-domain.com/auth/github/callback
GITLAB_CLIENT_ID=<your-gitlab-client-id>
GITLAB_CLIENT_SECRET=<your-gitlab-client-secret>
GITLAB_CALLBACK_URL=https://your-domain.com/auth/gitlab/callback
BITBUCKET_CLIENT_ID=<your-bitbucket-client-id>
BITBUCKET_CLIENT_SECRET=<your-bitbucket-client-secret>
BITBUCKET_CALLBACK_URL=https://your-domain.com/auth/bitbucket/callback
```

## Update Frontend for Production

After deployment, update the `API_URL` in `auth.html`:

```javascript
const API_URL = 'https://your-backend-domain.com';
```

## Database Persistence

Note: SQLite database won't persist on some free hosting platforms. For production, consider:
- PostgreSQL (recommended)
- MongoDB
- Or use a hosting service that supports file persistence

## Security Tips

1. Always use HTTPS in production
2. Use strong SESSION_SECRET
3. Keep OAuth secrets secure
4. Enable rate limiting
5. Implement proper error handling
6. Add input validation