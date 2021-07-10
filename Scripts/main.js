let songs;
let audio;
let playing = false;
main();

async function profile() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get("user");
  const userType = urlParams.get("type");
  window.location.href =
    "../../profile/?user=" + username + "&type=" + userType;
}

async function main() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get("user");
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

  const response = await fetch("/songs", options);
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
  audioURL = (await response.json()).songURL;

  if (playing) {
    audio.pause();
    audio = await new Audio(audioURL);
    audio.play();
  } else {
    audio = await new Audio(audioURL);
    audio.play();
    playing = true;
  }
}

function like(id) {
  console.log(id);
}
