const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://hlebbbik777-bot.github.io'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'demo-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Demo user data
const demoUsers = {
  google: {
    id: 'google-123',
    provider: 'google',
    email: 'demo@gmail.com',
    name: 'Google User',
    avatar: 'https://lh3.googleusercontent.com/a/default-user'
  },
  github: {
    id: 'github-456',
    provider: 'github',
    email: 'demo@github.com',
    name: 'GitHub User',
    avatar: 'https://github.com/github.png'
  },
  gitlab: {
    id: 'gitlab-789',
    provider: 'gitlab',
    email: 'demo@gitlab.com',
    name: 'GitLab User',
    avatar: 'https://gitlab.com/assets/logo.png'
  },
  bitbucket: {
    id: 'bitbucket-012',
    provider: 'bitbucket',
    email: 'demo@bitbucket.org',
    name: 'Bitbucket User',
    avatar: 'https://bitbucket.org/account/avatar.png'
  }
};

// Demo auth routes
app.get('/auth/google', (req, res) => {
  // Simulate OAuth redirect
  setTimeout(() => {
    req.session.user = demoUsers.google;
    res.redirect('/auth/success');
  }, 1000);
});

app.get('/auth/github', (req, res) => {
  setTimeout(() => {
    req.session.user = demoUsers.github;
    res.redirect('/auth/success');
  }, 1000);
});

app.get('/auth/gitlab', (req, res) => {
  setTimeout(() => {
    req.session.user = demoUsers.gitlab;
    res.redirect('/auth/success');
  }, 1000);
});

app.get('/auth/bitbucket', (req, res) => {
  setTimeout(() => {
    req.session.user = demoUsers.bitbucket;
    res.redirect('/auth/success');
  }, 1000);
});

app.get('/auth/success', (req, res) => {
  if (req.session.user) {
    res.json({
      success: true,
      user: req.session.user
    });
  } else {
    res.status(401).json({ success: false, message: 'Not authenticated' });
  }
});

app.get('/auth/error', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Authentication failed'
  });
});

app.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

app.get('/auth/status', (req, res) => {
  if (req.session.user) {
    res.json({
      authenticated: true,
      user: req.session.user
    });
  } else {
    res.json({ authenticated: false });
  }
});

// API routes
app.get('/api/user', (req, res) => {
  if (req.session.user) {
    res.json({
      success: true,
      user: req.session.user
    });
  } else {
    res.status(401).json({ success: false, message: 'Not authenticated' });
  }
});

app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    users: Object.values(demoUsers)
  });
});

app.delete('/api/user', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Delete failed' });
    }
    res.json({ success: true, message: 'Account deleted successfully' });
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Demo auth server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Demo Auth Server running on port ${PORT}`);
  console.log(`Environment: demo mode (no real OAuth)`);
  console.log(`Open http://localhost:${PORT}/health to test`);
});