const signupFormHandler = async (event) => {
  event.preventDefault();

  // Get form input values
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Validate input fields
  if (!username || !email || !password) {
    alert('Please provide username, email, and password.');
    return;
  }

  // Check if the email is in a valid format
  if (!isValidEmail(email)) {
    alert('Please provide a valid email address.');
    return;
  }

  // Check if the password meets the minimum length requirement
  if (password.length < 8) {
    alert('Password must be at least 8 characters long.');
    return;
  }

  try {
    // Send signup request to the server
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to dashboard upon successful signup
      window.location.replace('/dashboard');
    } else {
      // Display error message if signup fails
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Failed to sign up. Please try again.';
      alert(errorMessage);
    }
  } catch (err) {
    console.error('Error:', err);
    alert('An unexpected error occurred. Please try again.');
  }
};

// Helper function to validate email format
const isValidEmail = (email) => {
  // Regular expression to check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Event listener for form submission
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
