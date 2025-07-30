const audio = document.getElementById("audio-player");

let songs = [];
let currentSongIndex = -1;

// Yeh function song play karega
function playSong(file, title, artist, image) {
  audio.src = file;
  audio.play();

  // Bottom Player Update
  document.querySelector(".now-footer img").src = image;
  document.querySelector(".song-text .title").textContent = title;
  document.querySelector(".song-text .artist").textContent = artist;

  // Add song to the array if not already there
  const songObject = { file, title, artist, image };
  const existingIndex = songs.findIndex((s) => s.file === file);
  if (existingIndex === -1) {
    songs.unshift(songObject); // add at top
    currentSongIndex = 0;
  } else {
    currentSongIndex = existingIndex;
  }

  renderNowPlayingQueue();

  document.querySelector(".footer-play i").classList.remove("fa-play");
  document.querySelector(".footer-play i").classList.add("fa-pause");
}

// Now Playing Right Sidebar
function renderNowPlayingQueue() {
  const list = document.getElementById("nowPlayingList");
  list.innerHTML = "";

  songs.forEach((song, index) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-item");
    if (index === currentSongIndex) {
      songDiv.classList.add("playing");
    }
    songDiv.innerHTML = `
      <img src="${song.image}" width="40" height="40" />
      <div>
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist}</div>
      </div>
    `;
    songDiv.addEventListener("click", () => {
      playSong(song.file, song.title, song.artist, song.image);
    });
    list.appendChild(songDiv);
  });
}

// Bottom Controls
document.querySelector(".footer-play").addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    document.querySelector(".footer-play i").classList.remove("fa-play");
    document.querySelector(".footer-play i").classList.add("fa-pause");
  } else {
    audio.pause();
    document.querySelector(".footer-play i").classList.remove("fa-pause");
    document.querySelector(".footer-play i").classList.add("fa-play");
  }
});

// Previous Button
document.querySelector(".prev").addEventListener("click", () => {
  if (currentSongIndex < songs.length - 1) {
    currentSongIndex++;
    const song = songs[currentSongIndex];
    playSong(song.file, song.title, song.artist, song.image);
  }
});

// Next Button
document.querySelector(".next").addEventListener("click", () => {
  if (currentSongIndex > 0) {
    currentSongIndex--;
    const song = songs[currentSongIndex];
    playSong(song.file, song.title, song.artist, song.image);
  }
});



// Initial Load
window.onload = () => {
  renderNowPlayingQueue();
};



// settings

const toggle = document.getElementById("themeToggle");
const body = document.body;

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.classList.remove("dark");
    body.classList.add("light");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
  }
});


// logout


  function showLogoutModal() {
    document.getElementById("logoutModal").style.display = "block";
  }

  function closeLogoutModal() {
    document.getElementById("logoutModal").style.display = "none";
  }

  function confirmLogout() {
    // Redirect to logout page (change to login.html if needed)
    window.location.href = "logout.html";
  }


  