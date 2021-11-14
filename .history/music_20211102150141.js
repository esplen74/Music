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
  currentIndex: 3,
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
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const cdWidth = cd.offsetWidth;
    const isPlaying = false;
    const isRandom = false;
    const isRepeat = false;
    const _this = this;

    // xử lí CD quay / dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // xử lí phóng to / thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    // xử lí play music
    btnPlay.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // khi tiến độ bài hát được phát
    audio.ontimeupdate = function () {
      const progressPercent = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      progress.value = progressPercent;
    };

    // xử lí khi tua
    progress.onchange = function () {
      const seekTime = (audio.duration * progress.value) / 100;
      audio.currentTime = seekTime;
    };
    //Khi next bài hát
    btnNext.onclick = function () {
      if (_this.isRandom) {
        _this.RandomSong();
        audio.play();
      } else {
        _this.NextSong();
        audio.play();
      }
      _this.render();
      _this.ScrollSongActiveintoView();
    };

    // Khi Prev bài hát
    btnPrev.onclick = function () {
      if (_this.isRandom) {
        _this.RandomSong();
        audio.play();
      } else {
        _this.PrevSong();
        audio.play();
      }
      _this.render();
      _this.ScrollSongActiveintoView();
    };

    //Khi random bài hát
    btnRandom.onclick = function () {
      _this.isRandom = !_this.isRandom;
      btnRandom.classList.toggle("active", _this.isRandom);
    };
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        btnNext.click();
      }
    };

    // xử lý next song khi bị audio ended
    btnRepeat.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      this.classList.toggle("active", _this.isRepeat);
    };

    // Lắng nghe  hành vi click vào playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || !e.target.closest(".option")) {
        // xử lý khi click vào song
        if (songNode) {
          _this.currentIndex = songNode.dataset.song;
          _this.loadCurrentSong();
          audio.play();
        }
      }
    };
  },
  // Active song into view
  ScrollSongActiveintoView: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  },

  RandomSong: function () {
    var newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  NextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  PrevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },

  start: function () {
    //định nghĩa cho các thuộc tính cho object
    this.defineProperties();

    // lắng nghe / xử lí các sự kiện
    this.handleEvents();

    //tải thông tin bài hát
    this.loadCurrentSong();

    this.render();
  },
};
app.start();
