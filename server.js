require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
    secret: process.env.EXP_SESS_SEC, // Use the session secret from environment variable
    cookie: {
        maxAge: 300000, // Session expires after 5 minutes of inactivity
        httpOnly: true, // HTTP only cookie
        secure: false, // Set to true if using HTTPS
        sameSite: 'strict', // Strict same-site policy
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        expiration: 24 * 60 * 60 * 1000 // Session expires after 24 hours (optional)
    })
};

app.use(session(sess)); // Apply session middleware
app.use(routes); // Apply routes

// Set up handlebars engine and views
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Sync sequelize models and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
    });
});
