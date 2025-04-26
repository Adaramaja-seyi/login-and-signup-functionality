

document.addEventListener('DOMContentLoaded', function(){
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const showSignuplink = document.getElementById('showSignup');
    const showLoginLink = document.getElementById('showLogin');
   
    
 






    //load users from local staorage
    let clients = JSON.parse(localStorage.getItem("client")) || [];

    //function to save user to local storage
    function saveToLocalStorage() {
        localStorage.setItem("client", JSON.stringify(clients));
    }

    // Show user details (placeholder function)

    // function clientDetails() {
    //     clients.forEach((client, index) => {
    //       console.log(`Client ${index + 1}:`, client);
    //     });
      
    // }

    showSignuplink.addEventListener('click', function(e){
     e.preventDefault();
    loginSection.style.display ='none';
    signupSection.style.display = 'block';
    });

    showLoginLink.addEventListener('click', function(e){
        e.preventDefault()
    loginSection.style.display ='block';
    signupSection.style.display = 'none';
    });

    function vaildationPassword(passsword){
        const passswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passswordRegex.test(passsword)

    }
    function vaildationEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           return emailRegex.test(email)

    }
    
    function vaildationName(name) {
      //check for minimum value
      const errors =[]

      if (name.length < 2 ){
        errors.push("Name must be at least 2 character long ") 
      }
      //check for only letter and spaces
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(name)){
        errors.push("Name should only contain only letter or spaces")
      }

      if (name !== name.trim()){
        errors.push("Name should not start or end with space ") 
      }
      if (errors.length > 0){
        return{isValid: false, messages : errors};
      }
      return{
        isValid : true, mesage: []
      }
    }


    
    function showError(input,message) {
        input.classList.add('error')
        const errorElement = input.nextElementSibling
        errorElement.textContent = message;
        
    }
    function clearError(input) {
        input.classList.remove('error')
        const errorElement = input.nextElementSibling
        errorElement.textContent = '';

    }

    function showFormError(container, message) {
        container.innerHTML = `<p>${message}</p>`
        container.classList.add('show')
    }

    function clearFormError(container) {
        container.innerHTML = ""; // Clear the error message
        container.classList.remove('show'); // Remove any styling class
    }



    const loginEmail = document.getElementById('email')
    const loginPassword = document.getElementById('password')
    const loginErrorContainer = document.getElementById('loginErrorContainer')
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("submits")





    function checkLoginInputs() {
        if (
            loginEmail.value.trim() === "" ||
            loginPassword.value.trim() === ""
        ) {
            loginButton.disabled = true; 
        } else {
            loginButton.disabled = false; 
        }
      }
    
      // Add event listeners to all inputs
      [
        loginEmail,
        loginPassword,
      ].forEach((input) => {
        input.addEventListener("input", checkLoginInputs);
      });
    
      // Initial check to disable the button on page load
      checkLoginInputs();
    
    


//check login for validation
    loginEmail.addEventListener('input', function(e){
        const emailInput = e.target;
        if (!vaildationEmail(emailInput.value)){
            showError(emailInput, "Please enter a valid email address")

        }else{
            clearError(emailInput)
        }
    })
    loginPassword.addEventListener('input', function(e) {
        const passwordInput = e.target;
        if (!vaildationPassword(passwordInput.value)) {
            showError(passwordInput, "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number");
        } else {
            clearError(passwordInput); 
        }
     

    })


    //Sign up validation

    const signUpName = document.getElementById("fullName")
    const signUpEmail = document.getElementById('signupEmail')
    const SignUpPassword = document.getElementById('signupPassword')
    const SignUpConfirm = document.getElementById('confirmPassword')
    const signupForm = document.getElementById("signupForm");
    const signupButton = document.getElementById("submit")


//function to check all inputs are filled
function checkInputs() {
    if (
        signUpName.value.trim() === "" ||
        signUpEmail.value.trim() === "" ||
        SignUpPassword.value.trim() === "" ||
        SignUpConfirm.value.trim() === ""
    ) {
      signupButton.disabled = true; // Disable the button
    } else {
      signupButton.disabled = false; // Enable the button
    }
  }

  // Add event listeners to all inputs
  [
    signUpName,
    signUpEmail,
    SignUpPassword,
    SignUpConfirm,
  ].forEach((input) => {
    input.addEventListener("input", checkInputs);
  });

  // Initial check to disable the button on page load
  checkInputs();


    signUpName.addEventListener('input', function(e){
        const fullNameInput = e.target;
        const validationResult = vaildationName(fullNameInput.value);
        if (!validationResult.isValid){
            showError(fullNameInput, validationResult.messages)
        }else{
            clearError(fullNameInput)
        }
       
   
   
    })
    signUpEmail.addEventListener('input', function(e){
        const SignUpInput = e.target;
        if (!vaildationEmail(SignUpInput.value)){
            showError(SignUpInput, "Please enter a valid email address")

        }else{
            clearError(SignUpInput)
        }
    })

    SignUpPassword.addEventListener('input', function (e) {
        const passwordInput = e.target;
        if (!vaildationPassword(passwordInput.value)) {
            showError(passwordInput, "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number");
        } else {
            clearError(passwordInput);
        }
 
    });
    SignUpConfirm.addEventListener('input', function (e) {
        const confirmPasswordInput = e.target;
        if (SignUpPassword.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, "Passwords do not match");
        } else {
            clearError(confirmPasswordInput);
        }
    });
  
//save userdetails in local storage
signupButton.addEventListener('click', function(e){
    e.preventDefault()

    if( 
        signUpEmail.value.trim() !== "" &&
        signUpName.value.trim() !== "" &&
        SignUpConfirm.value.trim() !== "" &&
        SignUpPassword.value.trim() !== "" &&
        SignUpPassword.value === SignUpConfirm.value
    )
    {
        const userDetails = {
            name: signUpName.value.trim() ,
            email: signUpEmail.value.trim() ,
            passsword: SignUpPassword.value.trim()
        }
        clients.push(userDetails);
        saveToLocalStorage()
        checkInputs()
        alert("Sign up successFull")

        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
    }else{
        alert("Please fill in all fields correctly.")
    }
})
console.log("Clients in local storage:", clients);
console.log("Entered email:", loginEmail.value.trim());
console.log("Entered password:", loginPassword.value.trim());
// // Oluwaseyi25


//check if the email and password is correct
loginButton.addEventListener('click', function (e) {
    e.preventDefault(); 
    if (loginEmail.value.trim() !== "" && loginPassword.value.trim() !== "") {
       
        const clients = JSON.parse(localStorage.getItem("client")) || [];

       
        const user = clients.find(
            (client) =>
                client.email === loginEmail.value.trim() &&
                client.passsword === loginPassword.value.trim()
        );

        if (user) {
            alert("Login successful!");
            loginEmail.value = "";
            loginPassword.value = "";

            clearFormError(loginErrorContainer);
        } else {
            showFormError(loginErrorContainer, "Invalid email or password");
        }
    } else {
        showFormError(loginErrorContainer, "Please fill in all fields");
    }
});


        
});


