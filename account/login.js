document.getElementById('loginForm').addEventListener('submit', async function(e){
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  
  try {
      const response = await fetch('PHP/Login.php', {
          method: 'POST',
          body:formData,
          credentials:'include'
      });

      const result = await response.json();
      if (result.success) {
          window.location.href = "../Homepage.php" // Lets make this go to the homepage at some point
      } else {
          document.getElementById("errorText").textContent = result.error; 
      }
  } catch (err) {
      document.getElementById('errorText').textContent = "Something went wrong.";
      console.error(err);
  }

})