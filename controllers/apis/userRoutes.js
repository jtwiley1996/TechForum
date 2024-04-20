const router = require('express').Router();
const { User } = require('../../models');

// Login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData || !userData.checkPassword(req.body.password)) {
      // Return a 401 Unauthorized response if login credentials are invalid
      return res.status(401).json({ message: 'Incorrect email or password. Please try again.' });
    }

    // Save user session upon successful login
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Login failed. Please try again later.' });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    // Destructure user input from request body
    const { username, email, password } = req.body;

    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Validate user input
    if (!username || !email || !password) {
      // Return a 400 Bad Request response if any required fields are missing
      return res.status(400).json({ message: 'Please provide a username, email, and password.' });
    }

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // Return a 409 Conflict response if the email is already in use
      return res.status(409).json({ message: 'Email already in use. Please use a different email address.' });
    }

    // Create a new user record in the database
    const newUser = await User.create({ username, email, password });

    // Optionally, you may omit sending back the user data in the response for security reasons
    // res.status(201).json({ message: 'User created successfully.' });

    // Alternatively, you can include the user data in the response
    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Failed to create user. Please try again.' });
  }
});


// Logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy the user session upon logout
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // Return a 404 Not Found response if the user session does not exist
    res.status(404).end();
  }
});

module.exports = router;
