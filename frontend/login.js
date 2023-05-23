document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = new FormData(loginForm);
      const loginData = {
        username: formData.get("username"),
        password: formData.get("password"),
      };
  
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
  
        if (response.ok) {
          // Handle success, e.g., display a success message or redirect to a confirmation page
          console.log("Login Succeeded!");
          loginForm.reset(); // Optional: Reset the form after successful submission
        } else {
          // Handle error response
          console.error("Login Failed!");
        }
      } catch (error) {
        // Handle network errors
        console.error("An error occurred:", error);
      }
    });
  
    // Any other login-specific code can go here
  });
  