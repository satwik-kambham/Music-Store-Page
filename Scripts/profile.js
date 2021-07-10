let editMode = false;
let ids = ["Email", "Mobile"];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("user");
const type = urlParams.get("type");

document.getElementById("Username").innerText = username;

if (type != "artist") {
  document.getElementById("artistbtn").style.display = "none";
}

setup();

//request stuff from server and add to profile
async function setup() {
  const user = { username: username };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  let response = await fetch("/user", options);
  let resp = await response.json();

  document.getElementById("Email").innerText = resp.userData.email;
  document.getElementById("Mobile").innerText = resp.userData.mobile;
  document.getElementById(resp.userData.subscription).checked = true;

  // adding to history table
  response = await fetch("/historyList", options);
  resp = await response.json();

  let table = document.getElementById("history");

  resp.songData.forEach(async (row) => {
    songId = { songId: row.songId };

    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songId),
    };

    response = await fetch("/songId", options);
    resp = await response.json();

    resp.songData.forEach((row) => {
      let r = table.insertRow();

      let songid = r.insertCell();
      songid.innerText = row.songId;
      let songname = r.insertCell();
      songname.innerText = row.songName;
      let genre = r.insertCell();
      genre.innerText = row.genre;
      let views = r.insertCell();
      views.innerText = row.views;
      let likes = r.insertCell();
      likes.innerText = row.likes;
      let subscription = r.insertCell();
      subscription.innerText = row.subscription;
    });
  });

  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  // adding to liked songs table
  response = await fetch("/likedList", options);
  resp = await response.json();

  table = document.getElementById("liked");

  resp.songData.forEach(async (row) => {
    songId = { songId: row.songId };

    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songId),
    };

    response = await fetch("/songId", options);
    resp = await response.json();

    resp.songData.forEach((row) => {
      let r = table.insertRow();

      let songid = r.insertCell();
      songid.innerText = row.songId;
      let songname = r.insertCell();
      songname.innerText = row.songName;
      let genre = r.insertCell();
      genre.innerText = row.genre;
      let views = r.insertCell();
      views.innerText = row.views;
      let likes = r.insertCell();
      likes.innerText = row.likes;
      let subscription = r.insertCell();
      subscription.innerText = row.subscription;
    });
  });
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
  const userType = urlParams.get("type");
  window.location.href = "../../main/?user=" + username + "&type=" + userType;
}

function manageSongs() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get("user");
  const userType = urlParams.get("type");
  window.location.href = "../../manage/?user=" + username + "&type=" + userType;
}
