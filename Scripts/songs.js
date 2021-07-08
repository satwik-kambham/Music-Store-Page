const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("user");
const type = urlParams.get("type");

setup();

//request stuff from server and add to songsList
async function setup() {
  const user = { username: username };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch("/song", options);
  const resp = await response.json();

  console.log(resp);
}

function main() {
  window.location.href = "../../main/?user=" + username + "&type=" + userType;
}

function profile() {
  window.location.href =
    "../../profile/?user=" + username + "&type=" + userType;
}

async function addSong() {
  const songName = document.getElementById("songName").value;
  const genre = document.getElementById("songGenre").value;
  const coverImgURL = document.getElementById("songImage").value;
  const audioURL = document.getElementById("songAudio").value;

  const user = document.getElementsByName("subscription");
  let subscription;

  for (i = 0; i < user.length; i++) {
    if (user[i].checked) subscription = user[i].value;
  }

  const songInfo = {
    songName: songName,
    artistName: username,
    genre: genre,
    coverImgURL: coverImgURL,
    audioURL: audioURL,
    subscription: subscription,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songInfo),
  };

  const response = await fetch("/songAdd", options);
  const resp = await response.json();

  console.log(resp);
}
