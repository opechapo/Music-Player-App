// volumeIcon.addEventListener("click", mute_sound);
const musicTitle = document.getElementById("music-title");
const musicArtist = document.getElementById("music-artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("player-progress");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeShow = document.getElementById("volume_show");
const volumeIcon = document.getElementById("volume_icon");
const volumeSlider = document.querySelector('input[type="range"]');

// Create an audio object
const audio = new Audio();

// Music Data
const songs = [
  {
    name: "Ayra-audio",
    title: "Rush",
    artist: "Ayra Starr",
    cover: "assets/ayra.jpg",
  },
  {
    name: "Rema-Calm-Down-audio",
    title: "Calm Down",
    artist: "Rema",
    cover: "assets/Rema Calm down.jpg",
  },
  {
    name: "Omah-lay- audio",
    title: "Soso",
    artist: "Omah Lay",
    cover: "assets/omah lay soso.jpg",
  },
];

// Default Song
let songIndex = 0;

// Load Song
function loadSong(song) {
  musicTitle.textContent = song.title;
  musicArtist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = `assets/${song.name}.mp3`; // Set audio source
}

// Load first song initially
loadSong(songs[songIndex]);

// Play Music
function playMusic() {
  playBtn.setAttribute("name", "pause");
  playBtn.classList.replace('play', 'pause');
  audio.play();
}

// Pause Music
function pauseMusic() {
  playBtn.setAttribute("name", "play");
  playBtn.classList.replace('pause', 'play');
  audio.pause();
}

// Toggle Play/Pause
playBtn.addEventListener("click", () => {
  const isPlaying = playBtn.getAttribute("name") === "pause";
  isPlaying ? pauseMusic() : playMusic();
});

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playMusic();
}

prevBtn.addEventListener("click", prevSong);

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playMusic();
}

nextBtn.addEventListener("click", nextSong);

// Update Progress Bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Display current time and duration
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);
  if (duration) {
    durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
  }
}

// Set Progress Bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener("click", setProgress);

// Event Listener for progress update
audio.addEventListener("timeupdate", updateProgress);

// Volume Control
function volume_change() {
  audio.volume = volumeSlider.value / 100;
  volumeShow.textContent = volumeSlider.value;
}

volumeSlider.addEventListener("input", volume_change);

// Mute/Unmute Sound
function mute_sound() {
  if (audio.muted) {
    audio.muted = false;
    volumeIcon.setAttribute("name", "volume-high");
  } else {
    audio.muted = true;
    volumeIcon.setAttribute("name", "volume-off");
  }
}

volumeIcon.addEventListener("click", mute_sound);
