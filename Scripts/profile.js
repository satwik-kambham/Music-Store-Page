let editMode = false;
let ids = ["Username", "Email", "Mobile", "Subscription"];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("user");

document.getElementById("Username").innerText = username;

//request stuff from server and add to profile


function editProfile() {
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
