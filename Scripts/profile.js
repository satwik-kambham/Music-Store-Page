let editMode = false;
let ids = ["Email", "Mobile"];

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
  document.getElementById(resp.userData.subscription).checked = true;
}

async function editProfile() {
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

    // sending changes to the server
    const user = document.getElementsByName("subscription");
    let subscription;

    for (i = 0; i < user.length; i++) {
      if (user[i].checked) subscription = user[i].value;
    }
    let changedInfo = {
      username: username,
      email: document.getElementById("Email").innerText,
      mobile: document.getElementById("Mobile").innerText,
      subscription: subscription,
    };
    console.log(changedInfo);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedInfo),
    };

    const responce = await fetch("/updateUser", options);
    const res = await responce.json();
    alert(res.status);
  }
  editMode = !editMode;
}

async function main() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get("user");
  window.location.href = "../../main/?user=" + username;
}
