var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var inidcator = document.getElementById("indicator");

function register() {
  RegForm.style.transform = "translateX( 0px )";
  LoginForm.style.transform = "translateX( 0px)";
  indicator.style.transform = "translateX( 120px)";
}
function login() {
  RegForm.style.transform = "translateX( 300px )";
  LoginForm.style.transform = "translateX( 300px)";
  indicator.style.transform = "translateX( 0px)";
}

function guestLogin() {
  window.location.href = "profile.html";
}

var editMode = false;
function editProfile() {
  let ids = ["Username", "Email", "Mobile", "Subscription"];
  if (!editMode) {
    ids.forEach((id) => {
      let e = document.getElementById(id);
      let text = e.innerText;
      e.innerHTML = `<input value='${text}' id='${id + "1"}'/>`;
    });
    document.getElementById("editbtn").innerText = "Save Changes";
  } else {
    ids.forEach((id) => {
      let e = document.getElementById(id + "1");
      let text = e.value;
      e.outerHTML = `${text}`;
    });
    document.getElementById("editbtn").innerText = "Edit Profile";
  }
  editMode = !editMode;
}
