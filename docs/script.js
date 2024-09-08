// Load data from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Display posts
    const postContainer = document.getElementById('post-container');
    data.posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.textContent = post.title;
      postContainer.appendChild(postElement);
    });

    // Display important requests
    const importantRequestContainer = document.getElementById('important-request-container');
    data.importantRequests.forEach(request => {
      const requestElement = document.createElement('div');
      requestElement.textContent = request.title;
      importantRequestContainer.appendChild(requestElement);
    });
  })
  .catch(error => console.error('Error:', error));

// Handle login form submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  // Implement login logic here
  console.log('Logged in:', username, password);
});

// Handle registration form submission
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', event => {
  event.preventDefault();
  const newUsername = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;
  // Implement registration logic here
  console.log('Registered:', newUsername, newPassword);
});

