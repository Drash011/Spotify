const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const songName = document.getElementById("songName");
const songImg = document.getElementById("songImg");
let currentPlaylist = null;
 
let songs = [
  {
    name: "Saiyaara-Title Track",
    artist: "Faheem Abdullah",
    file: "songs/Saiyaara-title.mp3",
    img: "images/saiyaara.jpeg",
  },
  {
    name: "Humsafar",
    artist: "Sachet Tandon, Parampara Tandon",
    file: "songs/Humsafar.mp3",
    img: "images/humsafar.jpeg",
  },
  {
    name: "Tu Jhoom",
    artist: "Shelly Khatri Taluja",
    file: "songs/TuJhoom.mp3",
    img: "images/tu-jhoom.jpeg",
  },
  {
    name: "Daryaa (Manmarziyan)",
    artist: "Ammy Virk & Shahid Mallya",
    file: "songs/Daryaa_Manmarziyaan.mp3",
    img: "images/daryaa.jpeg",
  },
  {
    name: "Believer",
    artist: "Imagine Dragons",
    file: "songs/Believer.mp3",
    img: "images/believer.jpeg",
  },
];

let index = 0;

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".song-item");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const i = item.getAttribute("data-index");
      playSong(Number(i));
    });
  });
});

function playSong(i) {
  if (!songs[i]) return;

  index = i;
  currentPlaylist = songs;

  audio.pause();

  audio.src = songs[i].file;
  audio.currentTime = 0;

  songName.innerText = songs[i].name;
  document.getElementById("artistName").innerText = songs[i].artist;

  songImg.src = songs[i].img;

  highlightSong(i);

  audio
    .play()
    .then(() => {
      playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    })
    .catch((err) => console.log("Play error:", err));
}

function highlightSong(i) {
  document.querySelectorAll(".song-item").forEach((el, idx) => {
    el.style.background = idx === i ? "#2a2a2a" : "transparent";
  });
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
  }
}

function nextSong() {
  if (currentPlaylist) {
    index = (index + 1) % currentPlaylist.length;
    playFromCurrent();
  } else {
    index = (index + 1) % songs.length;
    playSong(index);
  }
}

function prevSong() {
  if (currentPlaylist) {
    index = (index - 1 + currentPlaylist.length) % currentPlaylist.length;
    playFromCurrent();
  } else {
    index = (index - 1 + songs.length) % songs.length;
    playSong(index);
  }
}

function playFromCurrent() {
  const song = currentPlaylist[index];

  if (!song) return;

  audio.src = song.file;
  audio.currentTime = 0;

  songName.innerText = song.name;
  document.getElementById("artistName").innerText = song.artist;
  songImg.src = song.img;

  audio.play();
  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
}

function formatTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (sec < 10) sec = "0" + sec;
  return min + ":" + sec;
}

audio.addEventListener("loadedmetadata", () => {
  if (!isNaN(audio.duration)) {
    durationEl.innerText = formatTime(audio.duration);
  }
});

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.innerText = formatTime(audio.currentTime);
  }
});

progress.addEventListener("input", () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

function forward10() {
  audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
}

function back10() {
  audio.currentTime = Math.max(audio.currentTime - 10, 0);
}

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  nextSong();
});

// Playlist
const playlists = {
  hindi: {
    color: "linear-gradient(180deg, #e53935 0%, #7f0000 60%, #121212 100%)",
    songs: [
      {
        name: "Saibo",
        artist: "Sachin-Jigar, Shreya Ghosha",
        file: "songs/Saibo.mp3",
        img: "images/saibo.jpeg",
      },
      {
        name: "Kesariya",
        artist: "Arijit Singh",
        file: "songs/kesariya.mp3",
        img: "images/kesariya.jpeg",
      },
      {
        name: "Rang Jo Lagyo",
        artist: "Atif Aslam, Shreya Ghoshal",
        file: "songs/Rang Jo Lagyo.mp3",
        img: "images/rang-jo-lagyo.jpeg",
      },
      {
        name: "Heeriye",
        artist: "Arijit Singh",
        file: "songs/Heeriye.mp3",
        img: "images/heeriye.jpeg",
      },
      {
        name: "Sahiba",
        artist: "Arijit Singh",
        file: "songs/Sahiba.mp3",
        img: "images/sahiba.jpeg",
      },
      {
        name: "Jaan Se Guzarte Hain",
        artist: "Shashwat Sachdev, Khan Saab",
        file: "songs/Jaan Se Guzarte Hain.mp3",
        img: "images/Jaan Se Guzarte Hain.jpeg",
      },
      {
        name: "Raanjhan",
        artist: "Arijit Singh",
        file: "songs/Raanjhan.mp3",
        img: "images/Raanjhan.jpeg",
      },
      {
        name: "Paan Ki Dukaan",
        artist: "Arijit Singh",
        file: "songs/Paan Ki Dukaan.mp3",
        img: "images/paan-ki-dukan.jpeg",
      },
      {
        name: "Namo Namo",
        artist: "Amit Trivedi",
        file: "songs/NamoNamo.mp3",
        img: "images/namo-namo.jpg",
      },
      {
        name: "Ganga Ke Kinare",
        artist: "Bunny & Sagar",
        file: "songs/Ganga_Ke_Kinare.mp3",
        img: "images/ganga-ke-kinare.jpeg",
      },
      {
        name: "Tu Jhoom",
        artist: "Shelly Khatri Taluja",
        file: "songs/TuJhoom.mp3",
        img: "images/tu-jhoom.jpeg",
      },
      {
        name: "Jaan Nisaar",
        artist: "Arijit Singh",
        file: "songs/JaanNisaar.weba",
        img: "images/jaan-nisaar.jpeg",
      },
      {
        name: "Daryaa (Manmarziyan)",
        artist: "Ammy Virk & Shahid Mallya",
        file: "songs/Daryaa_Manmarziyaan.mp3",
        img: "images/daryaa.jpeg",
      },
    ],
  },

  english: {
    color: "linear-gradient(180deg, #8e24aa 0%, #4a148c 60%, #121212 100%)",
    songs: [
      {
        name: "Perfect",
        artist: "Ed Sheeran",
        file: "songs/Perfect.mp3",
        img: "images/perfect.jpeg",
      },
      {
        name: "Cheap Thrills",
        artist: "Sia, Sean Paul",
        file: "songs/Cheap Thrills.mp3",
        img: "images/cheap-thrills.jpeg",
      },
      {
        name: "Apt.",
        artist: "ROSÉ, Bruno Mars",
        file: "songs/Apt.mp3",
        img: "images/apt.jpeg",
      },
      {
        name: "Love Me Like You Do",
        artist: "Ellie Goulding",
        file: "songs/Love Me Like You Do.mp3",
        img: "images/love-me-like-you-do.jpeg",
      },
      {
        name: "What Makes You Beautiful",
        artist: "One Direction",
        file: "songs/What Makes You Beautiful.mp3",
        img: "images/what-makes-you-beautiful.jpeg",
      },
      {
        name: "Die With a Smile",
        artist: "Lady Gaga & Bruno Mars",
        file: "songs/Die With a Smile (JLAY EDITED).mp3",
        img: "images/die-with-smile.jpeg",
      },
      {
        name: "Fallin' All In You",
        artist: "Shawn Mendes",
        file: "songs/Fallin' All In You.mp3",
        img: "images/faalin'-all-in.jpeg",
      },
      {
        name: "Believer",
        artist: "Imagine Dragons",
        file: "songs/Believer.mp3",
        img: "images/believer.jpeg",
      },
    ],
  },

  gujarati: {
    color: "linear-gradient(180deg, #43a047 0%, #1b5e20 60%, #121212 100%)",
    songs: [
      {
        name: "Prem No Radio",
        artist: "Gopal Bharwad",
        file: "songs/Prem No Radio.mp3",
        img: "images/prem-no-radio.jpeg",
      },
      {
        name: "Kholiya Juda Ne Jiv Aek J Jevo",
        artist: "Parth Gadhavi, Kuldeep Gadhavi",
        file: "songs/KHOLIYA JUDA NE JIV AEKJ JEVO.mp3",
        img: "images/kholiya-juda-ne-jiv.jpeg",
      },
      {
        name: "Laad",
        artist: "Gopal Bharwad",
        file: "songs/Laad.mp3",
        img: "images/laad.jpeg",
      },
      {
        name: "Khalasi",
        artist: "Aditya Gadhvi",
        file: "songs/Khalasi.mp3",
        img: "images/khalasi.jpeg",
      },
      {
        name: "Jhanjariyu",
        artist: "Umesh Barot",
        file: "songs/Jhanjariyu.mp3",
        img: "images/Jhanjariyu.jpeg",
      },
      {
        name: "Thakar Ni Haveliyu",
        artist: "Gopal Bharwad",
        file: "songs/Thakar Ni Haveliyu.weba",
        img: "images/thakar-ni-haveliyu.jpeg",
      },
      {
        name: "Tulsishyam",
        artist: "Udaybhai Dhadhal",
        file: "songs/Tulsishyam.mp3",
        img: "images/tulsi-shayam.jpeg",
      },
      {
        name: "O Mari Vali Re",
        artist: "Kaushik Bharwad",
        file: "songs/O Mari Vali Re.weba",
        img: "images/o-mari-vali.jpeg",
      },
      {
        name: "Baby Bewafa",
        artist: "Jignesh Barot",
        file: "songs/Baby Bewafa.weba",
        img: "images/baby-bewafa.jpeg",
      },
    ],
  },

  saiyaara: {
    color: "linear-gradient(180deg, #35b0e5 0%, #003f7f 60%, #121212 100%)",
    songs: [
      {
        name: "Saiyaara-Title Track",
        artist: "Faheem Abdullah",
        file: "songs/Saiyaara-title.mp3",
        img: "images/saiyaara.jpeg",
      },
      {
        name: "Humsafar",
        artist: "Sachet Tandon, Parampara Tandon",
        file: "songs/Humsafar.mp3",
        img: "images/humsafar.jpeg",
      },
    ],
  },

  cocktail: {
    color: "linear-gradient(180deg, #baf54c 0%, #6a7f00 60%, #121212 100%)",
    songs: [
      {
        name: "Bandhu 2.0",
        artist: " Neeraj Shridhar, Kavita Seth",
        file: "songs/Bandhu 2.0.mp3",
        img: "images/bandhu-2-0.jpeg",
      },
      {
        name: "Mashooqa",
        artist: "Raghav Chaitanya, Ruaa Kayy, Mahmood",
        file: "songs/Mashooqa.mp3",
        img: "images/mashooqa.jpeg",
      },
    ],
  },
};

function loadPlaylist(type) {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("playlistPage").style.display = "block";

  const playlist = playlists[type];
  const songsContainer = document.getElementById("playlistSongs");

  document.getElementById("playlistTitle").innerText = type.toUpperCase();
  document.getElementById("playlistCover").src = `images/${type}-songs.jpeg`;
  document.getElementById("playlistDesc").innerText = "Various Artists";

  document.getElementById("playlistHeader").style.background = playlist.color;
  document.getElementById("playlistHeader").style.backgroundSize = "cover";

  songsContainer.innerHTML = "";

  playlist.songs.forEach((song, i) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${song.img}" width="50">
      <div>
        <h5>${song.name}</h5>
        <small>${song.artist}</small>
      </div>
    `;

    div.onclick = () => playPlaylistSong(type, i);

    songsContainer.appendChild(div);
  });
}

function goHome() {
  document.getElementById("playlistPage").style.display = "none";
  document.getElementById("homePage").style.display = "block";
}

function playPlaylistSong(type, i) {
  const list = playlists[type].songs;
  const song = list[i];

  if (!song) return;

  currentPlaylist = list;
  index = i;

  audio.pause();
  audio.src = song.file;
  audio.load();
  audio.currentTime = 0;

  songName.innerText = song.name;
  document.getElementById("artistName").innerText = song.artist;
  songImg.src = song.img;

  audio
    .play()
    .then(() => {
      playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    })
    .catch((err) => console.log("Play error:", err));
}

function closePlaylist() {
  document.getElementById("playlistView").style.display = "none";
}






