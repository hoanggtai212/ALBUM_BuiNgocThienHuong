
const book = document.getElementById('book');
const pages = [];
const sound = document.getElementById("sound");

document.addEventListener("click", () => {
  if (sound.paused) {
    sound.currentTime = 11;
    sound.play().catch(err => console.log("Không phát được nhạc:", err));
  }
}, { once: true });

const introPage = document.createElement('div');
introPage.className = 'page';
introPage.dataset.originalZ = 100;
introPage.style.zIndex = 100;

const introFront = document.createElement('div');
introFront.className = 'front';
introFront.innerHTML = `
  <div class="intro-content">
    <h1>Memory Album</h1>
    <div><em>Reiyo Matsumoto</em></div>
    <div>🎁❤️🎁</div>
  </div>
`;
const introBack = document.createElement('div');
introBack.className = 'back';

introPage.appendChild(introFront);
introPage.appendChild(introBack);
book.appendChild(introPage);
pages.push(introPage);

const images = [];
for (let i = 1; i <= 20; i++) { //Chỉnh số lượng ảnh ở đây
  images.push(`./style/image/Anh (${i}).jpg`);
}

const dates = [
  "11-02-2026",
  "12-02-2026",
  "12-02-2026",
  "12-02-2026",
  "13-02-2026",
  "13-02-2026",
  "14-02-2026",
  "14-02-2026",
  "14-02-2026",
  "14-02-2026",
  "15-02-2026",
  "16-02-2026",
  "16-02-2026",
  "16-02-2026",
  "16-02-2026",
  "17-02-2026",
  "17-02-2026",
  "17-02-2026",
  "24-02-2026",
  "24-02-2026"
];

for (let i = 0; i < images.length; i++) {

  const page = document.createElement('div');
  page.className = 'page';
  const z = 99 - i;
  page.style.zIndex = z;

  const front = document.createElement('div');
  front.className = 'front';

  const back = document.createElement('div');
  back.className = 'back';

  // FRONT = TRANG BÊN PHẢI (có ảnh)
  const img = document.createElement('img');
  img.src = images[i];

  const caption = document.createElement('div');
  caption.className = 'caption';
  caption.innerText = dates[i] || "";

  front.appendChild(img);
  front.appendChild(caption);

  // BACK = TRANG BÊN TRÁI (trống)
  // không thêm gì vào back

  page.appendChild(front);
  page.appendChild(back);
  book.appendChild(page);
  pages.push(page);
}

const endPage = document.createElement('div');
endPage.className = 'page';
endPage.dataset.originalZ = 0;
endPage.style.zIndex = 0;

const endFront = document.createElement('div');
endFront.className = 'front';
endFront.innerHTML = `
  <div class="end-content">
    <h2>❤️ I Love You ❤️</h2>
    <span id="ending-text"></span>
  </div>
`;

const endBack = document.createElement('div');
endBack.className = 'back';
endBack.style.background = '#fff';

endPage.appendChild(endFront);
endPage.appendChild(endBack);
book.appendChild(endPage);
pages.push(endPage);

function typewriterEffect(text, element) {
  let i = 0;
  let slowRemaining = 0; // số ký tự còn lại cần chạy chậm

  function type() {
    if (i >= text.length) return;

    let speed = 80; // tốc độ bình thường

    // Nếu bắt đầu cụm "còn em"
    if (text.substring(i, i + 6) === "còn em") {
      slowRemaining = 6; // 6 ký tự: c ò n _ e m
    }

    // Nếu đang trong cụm cần chạy chậm
    if (slowRemaining > 0) {
      speed = 160; // tốc độ chậm cho toàn bộ "còn em"
      slowRemaining--;
    }

    // Nếu là dấu ...
    if (text.substring(i, i + 3) === "...") {
      speed = 350;
    }

    element.innerHTML += text[i] === '\n' ? '<br>' : text[i];
    i++;

    setTimeout(type, speed);
  }

  type();
}

let currentTopZ = 200;
let typed = false;

pages.forEach((page) => {
  let startX = 0;
  const front = page.querySelector('.front');
  const back = page.querySelector('.back');

  const flipForward = () => {
    if (!page.classList.contains('flipped')) {
      page.classList.add('flipped');

      if (page === pages[pages.length - 2] && !typed) {
        const endText = document.getElementById('ending-text');
        const content = `Toi iu 3 thứ trên thế giới này: 
        Mặt trời (the Sun) ☀️, 
        Mặt trăng (the Moon)🌕,
        Và em (the Exception) ❤️. 
        Mặt trời là ánh sáng của ban mai🌅,
        Mặt trăng là vẻ đẹp của màn đêm🌌,
        Còn em là 🤔 ... 
        Là đệ cụa toi 😎
        Ý nhầm, còn e là 🤔 ... 
        Là điều ngọt ngào nhất của a 😘`;
        endText.innerHTML = "";
        typewriterEffect(content, endText);

        typed = true;
      }

      setTimeout(() => {
        page.style.zIndex = 0;
      }, 1000);
    }
  };

  const flipBackward = () => {
    if (page.classList.contains('flipped')) {
      page.classList.remove('flipped');
      currentTopZ++;
      page.style.zIndex = currentTopZ;
    }
  };

  front.addEventListener('click', flipForward);
  back.addEventListener('click', flipBackward);

  page.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  page.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -30) flipForward();
    else if (diff > 30) flipBackward();
  });

});








