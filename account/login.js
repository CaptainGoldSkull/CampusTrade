function handleLogin(event) {
    event.preventDefault(); // Prevent form submission for demo purposes
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    // Simulate checking login credentials
    if (email && password) {
      // Correct redirection path
      window.location.href = "../../../index.html";
      return true;
    } else {
      alert('Please fill in both fields.');
      return false;
    }
}
  