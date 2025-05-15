  function handleSignUp(event) {
      event.preventDefault();
    
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
    // const confirmPassword = document.getElementById('confirm-password').value;
    
      // Username check
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(username)) {
        alert('Username must be 3–20 characters and only contain letters, numbers, or underscores.');
        return false;
      }
    
      // Email domain check
      if (!email.endsWith('@brighton.ac.uk')) {
        alert('Email must be a @brighton.ac.uk address.');
        return false;
      }
    
      // Password strength check
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long, with uppercase, lowercase, number, and special character (@$!%*?&).');
        return false;
      }
    
      // Confirm password
      //if (password !== confirmPassword) {
      //  alert('Passwords do not match.');
      //  return false;
      //}
    
      // Simulate email sent
      document.getElementById('signup-form').style.display = 'none';
      document.getElementById('message-container').style.display = 'block';
      return true;    
  }


  document.getElementById('signupForm').addEventListener('submit', async function(e){
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();

    const form = e.target;
    const formData = new FormData(form);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@uni\.brighton\.ac\.uk$/;

    if (!emailRegex.test(email.trim())) {
      document.getElementById("errorText").textContent = "Please use a valid university email"; 
      document.getElementById("errorText").style.display = "block";
      return;
    }
    try {
        const response = await fetch('../backendPhP/SignUp.php', {
            method: 'POST',
            body:formData,
            credentials:'include'
        });

        const result = await response.json();
        if (result.success) {   
            window.location.href = "./login.html" // Lets make this go to the homepage at some point
        } else {
            document.getElementById("errorText").textContent = result.error; 
            document.getElementById("errorText").style.display = "block";
        }
    } catch (err) {
          document.getElementById('errorText').textContent = "Something went wrong.";
          document.getElementById("errorText").style.display = "block";
          console.error(err);
    }

  })