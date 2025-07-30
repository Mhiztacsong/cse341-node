const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');
const connectToDb = require('./models/db');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const booksRoutes = require('./routes/booksRoutes');
const authorsRoutes = require('./routes/authorsRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

let db; // to hold the db instance

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "https://cse341-node-tgkb.onrender.com/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const usersCollection = db.collection('users');
    let user = await usersCollection.findOne({ githubId: profile.id });

    if (!user) {
      user = {
        githubId: profile.id,
        username: profile.username,
        email: profile.emails?.[0]?.value || 'N/A',
        createdAt: new Date()
      };
      await usersCollection.insertOne(user);
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.githubId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.collection('users').findOne({ githubId: id });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books and Authors API',
      version: '1.0.0',
      description: 'API for managing books and authors',
    },
  },
  apis: [path.join(__dirname, 'routes/*.js')],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Auth routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/profile')
);
app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/github');
}

// Routes
app.get('/', (req, res) => {
  res.send('<a href="/auth/github">Login with GitHub</a>');
});
app.get('/profile', ensureAuth, (req, res) => {
  res.send(`Hello, ${req.user.username} | <a href="/logout">Logout</a>`);
});

app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);

// Start the app after DB is connected
connectToDb()
  .then((database) => {
    db = database;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📘 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });
