
const book = document.getElementById('book');
const pages = [];
const sound = document.getElementById("sound");

document.addEventListener("click", () => {
  if (sound.paused) {
    sound.currentTime = 0;
   // sound.addEventListener("pause", () => {
   // setTimeout(() => {
   // sound.play().catch(() => {});
   //  }, 500); 
   //  });
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
    <div class="author"><em>Bùi Ngọc Thiên Hương 😍</em></div>
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
let isFlipping = false; // thêm dòng này

pages.forEach((page) => {
  let startX = 0;
  const front = page.querySelector('.front');
  const back = page.querySelector('.back');

const flipForward = () => {
  if (isFlipping) return;
  if (!page.classList.contains('flipped')) {

    isFlipping = true;

    // chạy animation nghiêng
    page.classList.add('flipping-forward');

    if (page === pages[pages.length - 2] && !typed) {
      const endText = document.getElementById('ending-text');
      const content = `A iu 3 thứ trên thế giới này : 
        Mặt trời (the Sun) ☀️, 
        Mặt trăg (the Moon)🌕,
        Và em (the Exception) ❤️. 
        Mặt trời là ...
        Ánh ság của ban mai 🌅,
        Mặt trăg là ...
        Vẻ đẹp của màn đêm 🌌,
        Còn e là 🤔 ... 
        Là đệ cụa toi 😎
        Ý nhầm, còn e là 🤔 ... 
        Là đìu ngọt ngào nhứt của a 😘
        { Hết }`;
      endText.innerHTML = "";
      typewriterEffect(content, endText);
      typed = true;
    }

    setTimeout(() => {
      page.classList.remove('flipping-forward'); // bỏ animation
      page.classList.add('flipped');             // giữ trạng thái 180°
      currentTopZ++;
      page.style.zIndex = currentTopZ;
      isFlipping = false;
    }, 1200);
  }
};

const flipBackward = () => {
  if (isFlipping) return;
  if (page.classList.contains('flipped')) {

    isFlipping = true;

    page.classList.add('flipping-backward');

    setTimeout(() => {
      page.classList.remove('flipping-backward');
      page.classList.remove('flipped');
      currentTopZ++;
      page.style.zIndex = currentTopZ;
      isFlipping = false;
    }, 1200);
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

// Khi rời khỏi tab -> pause
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    sound.pause();
  } else {
    sound.play().catch(() => {});
  }
});










css*{
  margin: 0;
  padding: 0;
  user-select: none;
  cursor: auto;
  box-sizing: border-box;
  
}

html, body {
  height: 100%;
  overflow: hidden;
  touch-action: manipulation;
  overscroll-behavior: none;
}

body {
  margin: 0;
  background: #ffeaf6;
  font-family: 'Poppins', sans-serif;
}

.author {
  font-size: clamp(22px, 5vw, 34px);
  margin-top: 15px;
  color: #333;
  font-weight: 600;
  letter-spacing: 2px;
  text-shadow: 0 3px 8px rgba(0,0,0,0.15);
}

.page {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
  backface-visibility: hidden;
  transform-origin: left;
  cursor: pointer;
  border: 3px solid #888;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  background: white;
}

.page .front img,
.page .back img {
  width: 100%;
  height: 90%;
  object-fit: cover;
  border: 2px solid #444;
  border-radius: 6px;
  box-sizing: border-box;
}

.page .back {
  transform: rotateY(180deg);
}

.page .back .photo-date {
  transform: rotateY(180deg);
  text-align: center;
  backface-visibility: hidden;
}

.page.flipping-forward {
  animation: flipWithTilt 1.2s ease-in-out forwards;
}

.page.flipping-backward {
  animation: flipBackWithTilt 1.2s ease-in-out forwards;
}

@keyframes flipBackWithTilt {
  0% {
    transform: rotateY(-180deg) rotateX(0deg);
  }
  40% {
    transform: rotateY(-90deg) rotateX(4deg);
  }
  100% {
    transform: rotateY(0deg) rotateX(0deg);
  }
}

.page.flipped {
  transform: rotateY(-180deg) rotateX(0deg);
}

@keyframes flipWithTilt {
  0% {
    transform: rotateY(0deg) rotateX(0deg);
  }
  40% {
    transform: rotateY(-90deg) rotateX(4deg); /* 👈 nghiêng nhẹ ở giữa */
  }
  100% {
    transform: rotateY(-180deg) rotateX(0deg); /* 👈 về thẳng lại */
  }
}

.intro-content, .end-content {
  text-align: center;
  border: 3px solid black;
  padding: 10px;
  border-radius: 15%;
}

.intro-content h1 {
  font-size: clamp(40px, 10vw, 70px);
  color: #fb18c2;
  margin-bottom: 15px;
  text-shadow: 0 4px 10px rgba(251, 24, 194, 0.3);
}

.intro-content p {
  font-size: clamp(22px, 6vw, 32px);
  line-height: 1.8;
  color: #555;
  line-height: 1.6;
}

.intro-content,.end-content {
  background: linear-gradient(135deg, #f5f7fa, #e0e4e8);
  width: 100%;
  height: 100%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.end-content h2 {
  font-family: 'Pacifico', cursive;
  font-size: clamp(20px, 5vw, 24px);
  margin-bottom: 14px;
  color: #333;
}

.end-content span {
  font-size: clamp(14px, 3.8vw, 17px);
  color: #444;
  line-height: 1.6;
}

.caption {
  margin-top: 18px;
  font-size: 20px;
  color: #555;
  text-align: center;
  z-index: 10;
  flex-shrink: 0;
}
  
.page .front,
.page .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 20px;
  box-sizing: border-box;
}

.book {
  position: absolute;
  perspective-origin: left center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(85vw, 750px);  /* giảm vw xuống */
  aspect-ratio: 3 / 4;  /* giữ tỉ lệ đẹp */
  perspective: 2000px;
  z-index: 1;
}

/* ===== LOCK SCREEN STYLE FINAL ===== */

#lock-screen-1,
#lock-screen-2,
#lock-screen-3 {
  position: fixed;
  inset: 0;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3d6dc;
  padding: 20px;
  z-index: 9999;
}

.lock-wrapper {
  width: 100%;
  max-width: 320px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;   /* 👈 thêm dòng này */
}

.lock-wrapper h2 {
  text-align: center;
  line-height: 1.4;
  height: 110px;      /* 👈 đổi thành height cố định */
}

.lock-wrapper h2 span {
  display: block;
  margin-top: 6px;
}

/* Tiêu đề */
#lock-screen-1 h2,
#lock-screen-2 h2,
#lock-screen-3 h2 {
  font-family: sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #e75480;
  margin-bottom: 8px;
}

/* Ô nhập pass */
.password-input {
  width: 100%;
  height: 42px;
  border-radius: 12px;
  border: none;
  outline: none;
  padding: 0 10px;
  font-size: 14px;
  text-align: center;
  background: #eeeeee;
}

/* Keypad */
.keypad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 280px;  /* 👈 thêm dòng này */
}

/* Nút số */
.keypad button {
  width: 100%;
  aspect-ratio: 1 / 1;  /* 👈 làm thành hình vuông */
  border-radius: 20px;
  border: none;
  background: #f9f9f9;
  color: #444;
  font-size: 20px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow:
    0 8px 20px rgba(0,0,0,0.08),
    inset 0 -2px 4px rgba(0,0,0,0.04);

  transition: all 0.2s ease;
}

.keypad button:active {
  transform: scale(0.93);
  box-shadow:
    0 4px 10px rgba(0,0,0,0.12),
    inset 0 2px 4px rgba(0,0,0,0.08);
}

/* Nút X */
.keypad .delete {
  background: linear-gradient(135deg, #ff6b9a, #e75480);
  color: white;
  font-weight: bold;
  box-shadow: 0 8px 18px rgba(231,84,128,0.4);
}

/* Nút xác nhận */
.submit-btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(135deg, #ff6b9a, #e75480);
  color: white;
  font-size: 24px;
  box-shadow: 0 10px 25px rgba(231,84,128,0.45);
}

.submit-btn:active {
  transform: scale(0.92);
}

/* ===== INPUT STYLE ===== */
input {
  transition: all 0.3s ease;
}

.input-error {
  border: 2px solid #ff4d4d;
  background: #ffe5e5;
}

.input-success {
  border: 2px solid #4CAF50;
  background: #e8fbe8;
}

/* ===== SHAKE ===== */
@keyframes shake {
  0% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
  100% { transform: translateX(0); }
}

.shake {
  animation: shake 0.4s;
}

/* ===== BIG UNLOCK OVERLAY ===== */

#unlock-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 20000;

  perspective: 1500px;   /* 👈 THÊM DÒNG NÀY */
}

.big-lock {
  position: relative;
  width: 160px;
  height: 160px;
  transform-style: preserve-3d;
  will-change: transform;
}

.big-lock .front {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;

  transform: rotateY(0deg) translateZ(2px); /* 👈 thêm dòng này */
}

.big-lock .back {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;

  transform: rotateY(180deg) translateZ(2px); /* 👈 thêm translateZ */
}

/* Xoay ổ khóa */
@keyframes lockSpin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(1800deg); /* 5 vòng */
  }
}

.spin {
  animation: lockSpin 2s ease-out forwards;
}

/* Khi mở */
.open {
  animation: popOpen 0.4s ease forwards;
}

@keyframes popOpen {
  0% {
    transform: rotateY(1800deg) scale(1);
  }
  60% {
    transform: rotateY(1800deg) scale(1.6);
  }
  100% {
    transform: rotateY(1800deg) scale(1.3);
  }
}

