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

function login() {
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

  fetch("/login", options);
}

function register() {
  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const mobile = document.getElementById("registerMobile").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirm").value;
  const user = document.getElementsByName("user");
  let userType;

  for (i = 0; i < user.length; i++) {
    if (user[i].checked)
      userType = user[i].value;
  }

  if (password != confirmPassword) {
    alert("Passord not same as confirm password");
  } else {
    const registerData = { username, password, email, mobile, userType };

    console.log(registerData);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    };

    fetch("/register", options);
  }
}

function guestLogin() {
  window.location.href = "profile.html";
}
