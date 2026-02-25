let currentLock = 1;
let inputPass = "";

const passwords = {
  1: "301213",
  2: "1",
  3: "2"
};

function getInput() {
  return document.getElementById("password-input-" + currentLock);
}

function enterNumber(num) {
  if (inputPass.length >= 8) return;
  inputPass += num;
  getInput().value = inputPass;
}

function deleteNumber() {
  inputPass = inputPass.slice(0, -1);
  getInput().value = inputPass;
}

function checkPass() {

  const currentScreen = document.getElementById("lock-screen-" + currentLock);

  if (inputPass === passwords[currentLock]) {

    const overlay = document.getElementById("unlock-overlay");
    const bigLock = overlay.querySelector(".big-lock");

    overlay.style.display = "flex";

    // reset trạng thái
    bigLock.classList.remove("spin", "open");
    void bigLock.offsetWidth;

    // 1️⃣ Quay (vẫn là 🔒)
    bigLock.classList.add("spin");

    // 2️⃣ Sau khi quay xong → bung to
    setTimeout(() => {
      bigLock.classList.add("open");
    }, 2000);

    // 3️⃣ Sau khi bung → đổi thành 🔓
    setTimeout(() => {
      const front = bigLock.querySelector(".front");
      const back = bigLock.querySelector(".back");

      if (front) front.textContent = "🔓";
      if (back) back.textContent = "🔓";
    }, 2400);

    // 4️⃣ Ẩn overlay & chuyển màn
    setTimeout(() => {

      overlay.style.display = "none";
      bigLock.classList.remove("spin", "open");

      // reset lại thành 🔒 cho lần sau
      const front = bigLock.querySelector(".front");
      const back = bigLock.querySelector(".back");
      if (front) front.textContent = "🔒";
      if (back) back.textContent = "🔒";

      currentScreen.style.display = "none";

      inputPass = "";
      getInput().value = "";

      if (currentLock < 3) {
        currentLock++;
        document.getElementById("lock-screen-" + currentLock).style.display = "flex";
      } else {
        document.getElementById("book").style.display = "block";
      }

    }, 3000);

  } else {

    // Sai → rung
    currentScreen.classList.add("shake");

    setTimeout(() => {
      currentScreen.classList.remove("shake");
    }, 400);

    inputPass = "";
    getInput().value = "";
  }
}
