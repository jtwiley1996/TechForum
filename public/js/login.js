


const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const data = await response.json();
        alert(data.message); // Display the error message sent from the server
      }
    } catch (err) {
      console.error('Error:', err); // Log any unexpected errors
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  console.log('Username:', username); // Added console log
  console.log('Email:', email); // Added console log
  console.log('Password:', password); // Added console log

  if (username && email && password) {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            alert(errorData.message);
          } else {
            alert('An error occurred. Please try again.');
          }
        } catch (error) {
          console.error('Error parsing response:', error);
          alert('An error occurred. Please try again.'); 
        }
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('A network error occurred. Please try again.'); 
    }
  }
};





document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

