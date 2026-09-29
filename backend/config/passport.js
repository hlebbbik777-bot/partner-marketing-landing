const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const GitLabStrategy = require('passport-gitlab2').Strategy;
const OAuth2Strategy = require('passport-oauth2').Strategy;
const db = require('./database');

module.exports = (passport) => {
  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser((id, done) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
      done(err, user);
    });
  });

  // Google Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { id, emails, displayName, photos } = profile;
      const email = emails[0]?.value;
      const avatar = photos[0]?.value;

      // Check if user exists
      db.get(
        'SELECT * FROM users WHERE provider = ? AND provider_id = ?',
        ['google', id],
        (err, user) => {
          if (err) return done(err);
          if (user) {
            // Update tokens
            db.run(
              'UPDATE users SET access_token = ?, refresh_token = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
              [accessToken, refreshToken, user.id],
              (err) => {
                if (err) return done(err);
                return done(null, user);
              }
            );
          } else {
            // Create new user
            db.run(
              'INSERT INTO users (provider, provider_id, email, name, avatar_url, access_token, refresh_token) VALUES (?, ?, ?, ?, ?, ?, ?)',
              ['google', id, email, displayName, avatar, accessToken, refreshToken],
              function(err) {
                if (err) return done(err);
                db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err, newUser) => {
                  if (err) return done(err);
                  return done(null, newUser);
                });
              }
            );
          }
        }
      );
    } catch (error) {
      return done(error, null);
    }
  }));

  // GitHub Strategy
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || '/auth/github/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { id, emails, displayName, photos } = profile;
      const email = emails[0]?.value;
      const avatar = photos[0]?.value;

      db.get(
        'SELECT * FROM users WHERE provider = ? AND provider_id = ?',
        ['github', id],
        (err, user) => {
          if (err) return done(err);
          if (user) {
            db.run(
              'UPDATE users SET access_token = ?, refresh_token = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
              [accessToken, refreshToken, user.id],
              (err) => {
                if (err) return done(err);
                return done(null, user);
              }
            );
          } else {
            db.run(
              'INSERT INTO users (provider, provider_id, email, name, avatar_url, access_token, refresh_token) VALUES (?, ?, ?, ?, ?, ?, ?)',
              ['github', id, email, displayName, avatar, accessToken, refreshToken],
              function(err) {
                if (err) return done(err);
                db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err, newUser) => {
                  if (err) return done(err);
                  return done(null, newUser);
                });
              }
            );
          }
        }
      );
    } catch (error) {
      return done(error, null);
    }
  }));

  // GitLab Strategy
  passport.use(new GitLabStrategy({
    clientID: process.env.GITLAB_CLIENT_ID,
    clientSecret: process.env.GITLAB_CLIENT_SECRET,
    callbackURL: process.env.GITLAB_CALLBACK_URL || '/auth/gitlab/callback',
    baseURL: 'https://gitlab.com'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { id, emails, displayName, avatarUrl } = profile;
      const email = emails[0]?.value;

      db.get(
        'SELECT * FROM users WHERE provider = ? AND provider_id = ?',
        ['gitlab', id],
        (err, user) => {
          if (err) return done(err);
          if (user) {
            db.run(
              'UPDATE users SET access_token = ?, refresh_token = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
              [accessToken, refreshToken, user.id],
              (err) => {
                if (err) return done(err);
                return done(null, user);
              }
            );
          } else {
            db.run(
              'INSERT INTO users (provider, provider_id, email, name, avatar_url, access_token, refresh_token) VALUES (?, ?, ?, ?, ?, ?, ?)',
              ['gitlab', id, email, displayName, avatarUrl, accessToken, refreshToken],
              function(err) {
                if (err) return done(err);
                db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err, newUser) => {
                  if (err) return done(err);
                  return done(null, newUser);
                });
              }
            );
          }
        }
      );
    } catch (error) {
      return done(error, null);
    }
  }));

  // Bitbucket Strategy (using generic OAuth2)
  passport.use('bitbucket', new OAuth2Strategy({
    authorizationURL: 'https://bitbucket.org/site/oauth2/authorize',
    tokenURL: 'https://bitbucket.org/site/oauth2/access_token',
    clientID: process.env.BITBUCKET_CLIENT_ID,
    clientSecret: process.env.BITBUCKET_CLIENT_SECRET,
    callbackURL: process.env.BITBUCKET_CALLBACK_URL || '/auth/bitbucket/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Fetch user profile from Bitbucket API
      const response = await fetch('https://api.bitbucket.org/2.0/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const userProfile = await response.json();

      const { uuid, display_name, nickname } = userProfile;
      const email = userProfile.email || `${nickname}@bitbucket.org`;
      const avatar = userProfile.links?.avatar?.href;

      db.get(
        'SELECT * FROM users WHERE provider = ? AND provider_id = ?',
        ['bitbucket', uuid],
        (err, user) => {
          if (err) return done(err);
          if (user) {
            db.run(
              'UPDATE users SET access_token = ?, refresh_token = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
              [accessToken, refreshToken, user.id],
              (err) => {
                if (err) return done(err);
                return done(null, user);
              }
            );
          } else {
            db.run(
              'INSERT INTO users (provider, provider_id, email, name, avatar_url, access_token, refresh_token) VALUES (?, ?, ?, ?, ?, ?, ?)',
              ['bitbucket', uuid, email, display_name, avatar, accessToken, refreshToken],
              function(err) {
                if (err) return done(err);
                db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err, newUser) => {
                  if (err) return done(err);
                  return done(null, newUser);
                });
              }
            );
          }
        }
      );
    } catch (error) {
      return done(error, null);
    }
  }));
};