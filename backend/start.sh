#!/bin/bash

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cat > .env << 'EOF'
# Server Configuration
PORT=5000
NODE_ENV=development
SESSION_SECRET=demo-session-secret-for-testing-only

# Google OAuth - Demo credentials (replace with real ones for production)
GOOGLE_CLIENT_ID=demo-google-client-id
GOOGLE_CLIENT_SECRET=demo-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# GitHub OAuth - Demo credentials (replace with real ones for production)
GITHUB_CLIENT_ID=demo-github-client-id
GITHUB_CLIENT_SECRET=demo-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback

# GitLab OAuth - Demo credentials (replace with real ones for production)
GITLAB_CLIENT_ID=demo-gitlab-client-id
GITLAB_CLIENT_SECRET=demo-gitlab-client-secret
GITLAB_CALLBACK_URL=http://localhost:5000/auth/gitlab/callback

# Bitbucket OAuth - Demo credentials (replace with real ones for production)
BITBUCKET_CLIENT_ID=demo-bitbucket-client-id
BITBUCKET_CLIENT_SECRET=demo-bitbucket-client-secret
BITBUCKET_CALLBACK_URL=http://localhost:5000/auth/bitbucket/callback
EOF
    echo "Created .env file with demo credentials"
fi

# Start the server
npm start