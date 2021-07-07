let editMode = false;
let ids = ["Username", "Email", "Mobile", "Subscription"];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("user");

document.getElementById("Username").innerText = username;
setup();

//request stuff from server and add to profile
async function setup() {
  const user = { username: username };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch("/user", options);
  const resp = await response.json();

  document.getElementById("Email").innerText = resp.userData.email;
  document.getElementById("Mobile").innerText = resp.userData.mobile;
  document.getElementById("Subscription").innerText =
    resp.userData.subscription;
}

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

async function main() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get("user");
  window.location.href = "../../main/?user=" + username;
}
