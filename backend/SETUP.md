# Setup Instructions

## 1. Create .env file

Copy `.env.example` to `.env`:
```bash
cp backend/.env.example backend/.env
```

## 2. Configure OAuth Applications

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 Client ID
5. Add redirect URI: `http://localhost:5000/auth/google/callback`
6. Copy Client ID and Client Secret to `.env`

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Copy Client ID and Client Secret to `.env`

### GitLab OAuth
1. Go to [GitLab User Settings](https://gitlab.com/-/profile/applications)
2. Create a new application
3. Redirect URI: `http://localhost:5000/auth/gitlab/callback`
4. Copy Application ID and Secret to `.env`

### Bitbucket OAuth
1. Go to [Bitbucket Developer Portal](https://bitbucket.org/account/settings/applications/)
2. Create an OAuth consumer
3. Callback URL: `http://localhost:5000/auth/bitbucket/callback`
4. Copy Key and Secret to `.env`

## 3. Start the backend

```bash
cd backend
npm start
```

The server will run on `http://localhost:5000`

## 4. Test the frontend

Open `auth.html` in your browser and click on the OAuth buttons to test authentication.

## 5. For Production

When deploying to production:
1. Change `NODE_ENV=production` in `.env`
2. Update callback URLs to your production domain
3. Change `SESSION_SECRET` to a secure random string
4. Use HTTPS
5. Update `API_URL` in `auth.html` to your production backend URL