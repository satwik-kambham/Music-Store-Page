var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var inidcator = document.getElementById("indicator");

function registerbtn() {
  RegForm.style.transform = "translateX( 0px )";
  LoginForm.style.transform = "translateX( 0px)";
  indicator.style.transform = "translateX( 120px)";
}
function loginbtn() {
  RegForm.style.transform = "translateX( 300px )";
  LoginForm.style.transform = "translateX( 300px)";
  indicator.style.transform = "translateX( 0px)";
}

async function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const loginData = { username, password };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  const response = await fetch("/login", options);
  const resp = await response.json();

  console.log(resp);
  if (resp.valid) {
    window.location.href = "main/?user=" + username + "&type=" + resp.userType;
  }
}

async function register() {
  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const mobile = document.getElementById("registerMobile").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirm").value;
  const user = document.getElementsByName("user");
  let userType;

  for (i = 0; i < user.length; i++) {
    if (user[i].checked) userType = user[i].value;
  }

  // TODO check if input is blank
  if (username.length > 30) {
    alert("Username cannot be greater than 30 characters");
    return;
  } else if (email.length > 30) {
    alert("Email id cannot be greater than 30 characters");
    return;
  } else if (mobile.length > 13) {
    alert("Mobile number cannot be greater than 13 characters");
    return;
  } else if (password.length > 30) {
    alert("Password cannot be greater than 30 characters");
    return;
  }

  if (password != confirmPassword) {
    alert("Passord not same as confirm password");
  } else {
    const registerData = { username, password, email, mobile, userType };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    };

    const response = await fetch("/register", options);
    let resp = await response.json();
    console.log(resp);
    if (resp.valid) {
      console.log("Valid credentials");
      alert("User successfully registered");
      window.location.href = "main/?user=" + username + "&type=" + userType;
    } else {
      alert("The username already exists.");
    }
  }
}
