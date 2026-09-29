const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google auth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/error' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

// GitHub auth routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/error' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

// GitLab auth routes
router.get('/gitlab', passport.authenticate('gitlab', { scope: ['read_user'] }));

router.get('/gitlab/callback',
  passport.authenticate('gitlab', { failureRedirect: '/auth/error' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

// Bitbucket auth routes
router.get('/bitbucket', passport.authenticate('bitbucket', { scope: ['account', 'email'] }));

router.get('/bitbucket/callback',
  passport.authenticate('bitbucket', { failureRedirect: '/auth/error' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

// Success route
router.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      success: true,
      user: {
        id: req.user.id,
        provider: req.user.provider,
        email: req.user.email,
        name: req.user.name,
        avatar: req.user.avatar_url
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Not authenticated' });
  }
});

// Error route
router.get('/error', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Authentication failed'
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Check authentication status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user.id,
        provider: req.user.provider,
        email: req.user.email,
        name: req.user.name,
        avatar: req.user.avatar_url
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;