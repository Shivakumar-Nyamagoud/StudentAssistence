// Function to toggle between Sign-In and Sign-Up forms
function toggleForm() {
    const signInForm = document.getElementById("form-container");
    const signUpForm = document.getElementById("signup-form-container");
  
    signInForm.style.display = signInForm.style.display === "none" ? "block" : "none";
    signUpForm.style.display = signUpForm.style.display === "none" ? "block" : "none";
  }
  
  // Function to dynamically change ID fields based on role selection (Sign-In)
  function updateFields() {
    const role = document.getElementById('role').value;
    const idLabel = document.getElementById('id-label');
    const userId = document.getElementById('user-id');
  
    if (role === "student") {
      idLabel.textContent = "Student ID:";
      userId.placeholder = "Enter your Student ID";
    } else if (role === "parent") {
      idLabel.textContent = "Parent ID:";
      userId.placeholder = "Enter your Parent ID";
    } else {
      idLabel.textContent = "ID:";
      userId.placeholder = "Enter your ID";
    }
  }
  
  // Function to dynamically change ID fields based on role selection (Sign-Up)
  function updateSignupFields() {
    const role = document.getElementById('role-signup').value;
    const idLabel = document.getElementById('id-label-signup');
    const userId = document.getElementById('user-id-signup');
    const parentFields = document.getElementById('parent-fields');
  
    if (role === "student") {
      idLabel.textContent = "Student ID:";
      userId.placeholder = "Enter your Student ID";
      parentFields.style.display = "none"; // Hide parent fields
    } else if (role === "parent") {
      idLabel.textContent = "Parent ID:";
      userId.placeholder = "Enter your Parent ID";
      parentFields.style.display = "block"; // Show parent fields
    } else {
      idLabel.textContent = "ID:";
      userId.placeholder = "Enter your ID";
      parentFields.style.display = "none"; // Hide parent fields
    }
  }
  