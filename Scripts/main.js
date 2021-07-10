let songs;
let audio;
let playing = false;
let userSub;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("user");
const userType = urlParams.get("type");

main();

const subscriptions = {
  base: 0,
  tier1: 1,
  tier2: 2,
};

async function profile() {
  window.location.href =
    "../../profile/?user=" + username + "&type=" + userType;
}

async function main() {
  document.getElementById("username").innerText = "Welcome: " + username;

  let songsDIV = document.getElementById("songs");

  const user = { username: username };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  let response = await fetch("/songs", options);
  songs = (await response.json()).songData;

  songs.forEach((song) => {
    let songHTML =
      `<div class="song"><img src="` +
      song.coverImageURL +
      `" /><hr /><div class="songInfo"><p>` +
      song.songName +
      `</p><p>Genre: ` +
      song.genre +
      `</p><p>Artist: ` +
      song.artistName +
      `</p><p>Views: ` +
      song.views +
      ` |  Likes: ` +
      song.likes +
      `</p></div><hr /><button onclick="play(this.id)" id="` +
      song.songId +
      `" class="playButton">Play</button>` +
      `<button onclick="like(this.id)" id="` +
      song.songId +
      `"class="likeBtn">Like</button></div>`;

    songsDIV.innerHTML += songHTML;
  });

  response = await fetch("/user", options);
  const resp = await response.json();
  userSub = resp.userData.subscription;
}

async function play(id) {
  let audioURL;

  const songInfo = { username: username, songId: id };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songInfo),
  };

  const response = await fetch("/play", options);
  const resp = await response.json();
  audioURL = resp.songURL;

  if (subscriptions[userSub] >= subscriptions[resp.subLevel]) {
    if (playing) {
      audio.pause();
      audio = await new Audio(audioURL);
      audio.play();
    } else {
      audio = await new Audio(audioURL);
      audio.play();
      playing = true;
    }

    fetch("/history", options);
  } else {
    alert(
      "You do not have the right subscription level to play this song. You need atleast subscription " +
        resp.subLevel +
        " to play this song."
    );
  }
}

function like(id) {
  // add to liked songs
  const songInfo = { username: username, songId: id };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songInfo),
  };

  fetch("/like", options);
}
