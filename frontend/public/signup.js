// Function to toggle between Sign-In and Sign-Up forms
function toggleForm() {
  const signInForm = document.getElementById("form-container");
  const signUpForm = document.getElementById("signup-form-container");

  // Toggle visibility
  if (signInForm.style.display === "none") {
      signInForm.style.display = "block";
      signUpForm.style.display = "none";
  } else {
      signInForm.style.display = "none";
      signUpForm.style.display = "block";
  }
}

// Function to dynamically update fields based on role selection (Sign-In)
function updateFields() {
  const role = document.getElementById("role").value;
  const idLabel = document.getElementById("id-label");
  const userId = document.getElementById("user-id");

  // Update label and placeholder based on selected role
  switch (role) {
      case "student":
          idLabel.textContent = "Student ID:";
          userId.placeholder = "Enter your Student ID";
          break;
      case "parent":
          idLabel.textContent = "Parent ID:";
          userId.placeholder = "Enter your Parent ID";
          break;
      default:
          idLabel.textContent = "ID:";
          userId.placeholder = "Enter your ID";
  }
}

// Function to dynamically update fields based on role selection (Sign-Up)
function updateSignupFields() {
  const role = document.getElementById("role-signup").value;
  const idLabel = document.getElementById("id-label-signup");
  const userId = document.getElementById("user-id-signup");
  const parentFields = document.getElementById("parent-fields");

  // Update fields visibility and labels based on selected role
  switch (role) {
      case "student":
          idLabel.textContent = "Student ID:";
          userId.placeholder = "Enter your Student ID";
          parentFields.style.display = "none"; // Hide parent-specific fields
          break;
      case "parent":
          idLabel.textContent = "Parent ID:";
          userId.placeholder = "Enter your Parent ID";
          parentFields.style.display = "block"; // Show parent-specific fields
          break;
      default:
          idLabel.textContent = "ID:";
          userId.placeholder = "Enter your ID";
          parentFields.style.display = "none"; // Hide parent-specific fields
  }
}

// Initializing forms visibility on page load
document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.getElementById("form-container");
  const signUpForm = document.getElementById("signup-form-container");

  // Ensure only the Sign-In form is visible by default
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});
