const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get current user
router.get('/user', (req, res) => {
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

// Get all users (admin only)
router.get('/users', (req, res) => {
  db.all('SELECT id, provider, email, name, avatar_url, created_at FROM users', [], (err, users) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json({ success: true, users });
  });
});

// Delete user account
router.delete('/user', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  db.run('DELETE FROM users WHERE id = ?', [req.user.id], (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Logout failed' });
      }
      res.json({ success: true, message: 'Account deleted successfully' });
    });
  });
});

module.exports = router;