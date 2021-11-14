// 1. Render songs
// 2. Scroll top
// 3. play/ pause
// 4. Cd rotate
// 5.Next / Prev
// 6. Random
// 7. Next / repeat when enabe
// 8. Active song
// 9. Scroll active song into view
// 10. Play song when click

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const btnPlay = $(".btn-toggle-play");
const playlist = $(".playlist");
const player = $(".player");
const progress = $(".progress");
const btnNext = $(".btn-next");
const btnPrev = $(".btn-prev");
const btnRandom = $(".btn-random");
const btnRepeat = $(".btn-repeat");

const app = {
  currentIndex: 6,
  songs: [
    {
      name: "Cưới Đi",
      singer: "2T, ChangC",
      path: "./music/song1.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2020/08/27/8/e/c/f/1598516178659_500.jpg",
    },
    {
      name: "Sài Gòn Đau Lòng Quá",
      singer: " Hứa Kim Tuyền",
      path: "./music/song2.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/03/27/d/2/9/1/1616859493571_500.jpg",
    },
    {
      name: "Một Mình Có Buồn Không",
      singer: "Thiều Bảo Trâm, Lou Hoàng",
      path: "./music/song3.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2020/10/19/f/5/8/c/1603078556165_500.jpg",
    },
    {
      name: "Lỡ Say Bye Là Bye",
      singer: "Lemese, Changg",
      path: "./music/song4.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/01/21/5/c/9/9/1611199600529_500.jpg",
    },
    {
      name: "Hương",
      singer: "Văn Mai Hương, Negav",
      path: "./music/song5.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/01/22/9/f/2/1/1611280898757_500.jpg",
    },
    {
      name: "Damn",
      singer: "Raftaar x kr$na",
      path: "./music/song6.mp3",
      image:
        "https://scontent.fdad4-1.fna.fbcdn.net/v/t1.6435-9/219394223_1466851590333701_3606370075101924204_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=CoR4g8AuzJUAX_UiqJh&_nc_ht=scontent.fdad4-1.fna&oh=9598a236af99117130ccc35f10837aea&oe=61A56E8B",
    },
    {
      name: "Cưới Thôi",
      singer: " Masew, Masiu, B Ray, V.A",
      path: "./music/song7.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/09/09/f/c/f/d/1631181753902_500.jpg",
    },
    {
      name: "Dịu Dàng Là Ngày Em Đến",
      singer: " ERIK, NinjaZ",
      path: "./music/song8.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/08/30/2/1/a/e/1630307726211_500.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
      <div class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-song=${index}>
                  <div class="thumb"
                      style="background-image: url('${song.image}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>
      `;
    });
    playlist.innerHTML = htmls.join("");
  },
  handleEvents: function () {
    //xử lí phóng to thu nhỏ CD
    const cdWidth = cd.offsetWidth;
    isPlaying = false;
    const _this = this;
    window.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    (cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    })),
      cdThumbAnimate.pause();
    // Xử lý khi song được play
    btnPlay.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    audio.ontimeupdate = function () {
      const currentTime = (this.currentTime / this.duration) * 100;
      progress.value = currentTime;
    };
    progress.onchange = function () {
      const seektime = (this.value / 100) * audio.duration;
      audio.currentTime = seektime;
    };
    // xử lý next
    btnNext.onclick = function () {
     
    };
    btnPrev.onclick = function () {
      
    };

  },
  nextSong: function() {
    if (_this.currentIndex >= _this.songs.length - 1) {
      _this.currentIndex = 0;
      _this.loadCurrentSong();
      audio.play();
    } else {
      _this.currentIndex++;
      _this.loadCurrentSong();
      audio.play();
    }
  },
  PrevSong: function() {
    if (_this.currentIndex <= 0) {
      _this.currentIndex = _this.songs.length -1;
      _this.loadCurrentSong();
    } else {
      _this.currentIndex--;
      _this.loadCurrentSong();
      audio.play();
    }
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },
  start: function () {
    this.defineProperties();

    //Tải thông tin bài hát đầu tiên vào UserInterface khi chạy
    this.loadCurrentSong();
    // xử Lý events
    this.handleEvents();
    this.render();
  },
};
app.start();
