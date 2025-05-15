        document.getElementById('loginForm').addEventListener('submit', async function(e){
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  
  try {
      const response = await fetch('backendPhP/Login.php', {
          method: 'POST',
          body:formData,
          credentials:'include'
      });

      const result = await response.json();
      if (result.success) {
          window.location.href = "../Homepage.php" // Lets make this go to the homepage at some point
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