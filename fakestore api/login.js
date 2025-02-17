// Select the form and input elements
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Function to validate the form inputs
function validateForm(event) {
  // Prevent the default form submission
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Validate email using regular expression (basic email format check)
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate password length (minimum 8 characters)
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  // If both validations pass, submit the form (in this case, just alert for demo)
  alert("Login successful!");
  form.submit();  // You can use form.submit() if you want to submit the form to a backend
}

// Add event listener to the form to trigger validation
form.addEventListener("submit", validateForm);
