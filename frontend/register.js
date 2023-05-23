document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
  
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = new FormData(registerForm);
      const registerData = {
        username: formData.get("new-username"),
        password: formData.get("new-password"),
      };
  
      try {
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        });
  
        if (response.ok) {
          // Handle success, e.g., display a success message or redirect to a confirmation page
          console.log("User registered successfully");
          registerForm.reset(); // Optional: Reset the form after successful submission
        } else {
          // Handle error response
          console.error("Failed to register user");
        }
      } catch (error) {
        // Handle network errors
        console.error("An error occurred:", error);
      }
    });
  });
  