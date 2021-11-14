// 1. Render songs
// 2. Scroll top
// 3. play/ pause
// 4. Cd rotate
// 5.Next / Prev
// 6. Random
// 7. Next / repeat when enabe
// 8. Active song // render
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
        "https://th.bing.com/th/id/OIP.iBnWFBIXKLuFs9xHKn65qgHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.25&pid=1.7",
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
  // render bài hát
  render : function() {
    const htmls = this.songs.map((song, index) => {
      return `
      const htmls = this.songs.map((song, index) => {
        return `
        <div class="song ${
          index === this.currentIndex ? "active" : ""
        }" data-index="${index}">
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
      `
    })
  },
  start: function() {
    this.render();
  }
}
app.start();