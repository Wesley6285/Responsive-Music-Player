let imgEl = document.getElementById("bg_img")
let imgCoverEl = document.getElementById("cover")
let musicTitleEl = document.getElementById("music_title")
let musicArtistEl = document.getElementById("musric_artist")
let playerProgressEl = document.getElementById("player_progress")
let progressEl = document.getElementById("progress")
let currentTimeEl = document.getElementById("current_time")
let durationEl = document.getElementById("duration")
let prevBtnEl = document.getElementById("prev")
let playvBtnEl = document.getElementById("play")
let nextvBtnEl = document.getElementById("next")
let likebtn=document.getElementById("favourite")
let bgcolor=document.querySelector(".container")
let volumefrequency=document.getElementById("volume")
let volumedown=document.getElementById("volumeDown")
let volumeUp=document.getElementById("volumeUp")

let songs = [
  {
    path: "Music/beliver.mp4",
    displayName: "Beliver",
    cover: "Aritest_Images/Beliver.jpg",
    artist: "IMAGINE DRAGONS",
  },
  {
    path: "Music/blindinglights.mp4",
    displayName: "Blinding Lights",
    cover: "Aritest_Images/Blinding_Lights.png",
    artist: "The Weekend",
  },
  {
    path: "Music/chainsmoker.mp4",
    displayName: "Closer ft Halsey",
    cover: "Aritest_Images/Chainsmoker.jpg",
    artist: "Chainsmokers",
  },
  {
    path: "Music/loveagain.mp4",
    displayName: "Love Again",
    cover: "Aritest_Images/Loveagain.png",
    artist: "Dua Lipa",
  },
  {
    path:"Music/perfect.mp4",
    displayName:"Perfect",
    cover:"Aritest_Images/perfect.jpeg",
    artist:"ED Sheeran"
  }
];
likebtn.addEventListener("dblclick",function(){
    likebtn.style.color='red'
})
likebtn.addEventListener("click",function(){
  likebtn.style.color='black'
})


let music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Play Song  True or False====================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

let currentwidth=40;
music.volume=0.5
volumedown.addEventListener("click",()=>{
  if (music.volume > 0) {
    music.volume = Math.max(0, music.volume - 0.1)
    currentwidth-=10;
    volumefrequency.style.width=currentwidth +"%";
  }
  
})
volumeUp.addEventListener("click",function(){
  if (music.volume < 1) {
    music.volume = Math.min(1, music.volume + 0.1)
    currentwidth+=10;
    volumefrequency.style.width=currentwidth +"%";
  }
})



//================== Play Music====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
//================== Pause Music====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
  musicArtistEl.textContent = songs.artist;
  imgCoverEl.src = songs.cover;
  imgEl.src = songs.cover;
}
//================== Change Music ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
//================== Set Progress ====================
function setProgressBar(e) {
  let width = playerProgressEl.clientWidth;
  let xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
  let { duration, currentTime } = music;
  let ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  let formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Btn Events========================
let btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);